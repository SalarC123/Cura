from flask import Flask
import pickle

# run flask app:
# export FLASK_APP=api.py
# python3 -m venv venv
# . venv/bin/activate
# cd api
# flask run

app = Flask(__name__)

model_filename = "svm_clf.pkl"

@app.route('/model')
def get_prediction():
    with open(model_filename, 'rb') as f:
        data = pickle.load(f)
        svm_clf = data["svm_clf"]
        symptoms = data["symptoms"]

        print(svm_clf)
        print(symptoms)
    
    # svm_clf.predict([np.ones_like(active_symptoms)])
    return {data: symptoms}

@app.route('/symptoms')
def get_symptoms():
    return {}

if __name__ == "__main__":
    app.run()