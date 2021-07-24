import Select from 'react-select'
import { useEffect } from 'react'

function App() {

	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' }
	]

	useEffect(() => {
		fetch("/symptoms")
		.then(res => res.json())
		.then(data => console.log(data))
		.catch(err => alert(err))
	}, [])

	function getDisease(e) {
		e.preventDefault()
		console.log(e.target[0])
	}

	return (
		<div className="text-white h-screen bg-indigo-300 flex flex-col items-center justify-center">
			<h1 className="text-center text-6xl font-extrabold p-4">Cura</h1>
			<p className="w-72 md:w-96 text-center">Cura lets you gets an idea of what disease you might have based on your current symptoms. Keep in mind that this is not official medical advice and you should instead contact a liscensed doctor if you believe this prognosis is incorrect</p>
			<form className="flex flex-col items-center p-8" onSubmit={e => getDisease(e)}>
				<label className="p-2 text-xl" htmlFor="symptoms">Enter Symptoms</label>
				<Select 
					className="w-72 md:w-96 text-black"
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
