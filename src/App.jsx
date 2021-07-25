import Select from 'react-select'
import { useEffect, useState } from 'react'

function App() {

	const [options, setOptions] = useState([])
	const [disease, setDisease] = useState("")
	const [selectedSymptoms, setSelectedSymptoms] = useState([])

	useEffect(() => {
		fetch("/symptoms")
		.then(res => res.json())
		.then(data => {

			const newOptions = []

			for (let symptom of data.symptoms) {
				newOptions.push({value: symptom, label: symptom})
			}

			setOptions(newOptions)
		})
	}, [])

	function getDisease(e) {
		e.preventDefault()

		if (!selectedSymptoms.length) {
			alert("Enter a symptom first")
			return
		}

		const userSymptoms = []

		for (let symptom of selectedSymptoms) {
			userSymptoms.push(symptom.value)
		}
		
		fetch("/model", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			}, 
			body: JSON.stringify({"user_symptoms": userSymptoms})
		})
		.then(res => res.json())
		.then(data => setDisease(data.disease))
	}

	return (
		<div className="text-white min-h-screen bg-indigo-300 flex flex-col items-center justify-center">
			<h1 className="text-center text-6xl font-extrabold p-4">Cura</h1>
			<p className="w-72 md:w-96 text-center">Cura lets you gets an idea of what disease you might have based on your current symptoms. Keep in mind that this is not official medical advice and you should instead contact a liscensed doctor if you believe this prognosis is incorrect</p>
			<form className="flex flex-col items-center px-4 py-2" onSubmit={e => getDisease(e)}>

				<h1 className=" font-extrabold text-4xl p-4 text-indigo-700">{disease}</h1>

				<label className="p-2 text-xl" htmlFor="symptoms">Enter Symptoms</label>
				<Select 
					className="w-72 md:w-96 text-black"
					value={selectedSymptoms}
					onChange={(selected) => setSelectedSymptoms(selected)}
					options={options}
					isMulti
					id="symptoms"
				/>
				<input className="py-1 px-2 m-2 hover:bg-gray-200 rounded-lg text-indigo-300 font-extrabold bg-white text-xl" type="submit" value="Submit" />
			</form>
		</div>
	);
}

export default App;
