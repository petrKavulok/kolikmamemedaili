import { useEffect, useState } from 'react'
import './App.css'
import { fetchMedalData } from './utils/fetchData'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { translate } from './utils/translate';

function App() {
const [data, setData] = useState<{ medalDisciplines: {gold: string[], silver: string[], bronze: string[]}; globalData: any; }>()

const fetcheddata = async () => {
	try {
		const response = await fetchMedalData()

		// @ts-expect-error
		setData(response)
	} catch (e) {
		console.warn(e)
	} 
} 

useEffect(() => {
	fetcheddata()
}, [])

const notify = (message: any) => { console.log(translate(message)); toast(translate(message).toString())};

return (
	<>
		<div className="container">
			<img src="./olympic.png" alt="Olympijské kruhy" className="image" />
			
				<h1 id="celkem" className="number">{data?.globalData.total}</h1>

			<section className="subcontainer">
				<article id="gold" onClick={() => notify(data?.medalDisciplines.gold)}>
					<h2>🥇 {data?.globalData.gold}</h2>
				</article>
				<article id="silver" onClick={() => notify(data?.medalDisciplines.silver)}>
				<h2>🥈 {data?.globalData.silver}</h2>
				</article>
				<article id="bronze" onClick={() => notify(data?.medalDisciplines.bronze)}>
				<h2>🥉 {data?.globalData.bronze}</h2>
				</article>
			</section>

		</div>
		<ToastContainer 
			theme='colored' 
			position="top-center" 
		/>
	</> 
	
)
}

export default App
