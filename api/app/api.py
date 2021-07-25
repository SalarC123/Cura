from flask import Flask, request
import numpy as np
import pickle
import json
import os
from sklearn import svm

os.chdir("./app")

# run flask app:
# export FLASK_APP=api.py
# python3 -m venv venv
# . venv/bin/activate
# cd api
# flask run

app = Flask(__name__)

model_filename = "svm_clf.pkl"
symptoms_filename = "symptoms.pkl"

@app.route('/model', methods=['POST', 'GET'])
def get_prediction():
    if request.method == 'POST':

        data = json.loads(request.data)

        with open(symptoms_filename, 'rb') as f:
            symptoms = pickle.load(f)

        with open(model_filename, 'rb') as f:
            svm_clf = pickle.load(f)
        
        # svm_clf.predict([np.ones_like(active_symptoms)])

        label_encoded_symptoms = np.zeros_like(symptoms, dtype='int')

        for user_symptom in data["user_symptoms"]:
            for index, symptom in enumerate(symptoms):
                if user_symptom == symptom:
                    label_encoded_symptoms[index] = 1

        disease = svm_clf.predict([label_encoded_symptoms])


        return {"disease": disease[0]}
    else:
        return {}

@app.route('/symptoms')
def get_symptoms():
    with open(symptoms_filename, 'rb') as f:
        symptoms = pickle.load(f)
    return {"symptoms": symptoms}