import { useEffect, useState } from 'react'
import './bratia.css'
import { fetchMedalData } from './utils/fetchData'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { translate } from './utils/translate';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Skeleton } from '@mui/material';

function Bratia() {
    const [data, setData] = useState<{ medalDisciplines: {gold: string[], silver: string[], bronze: string[]}; globalData: any; }>()
    
    const fetcheddata = async () => {
        try {
            const response = await fetchMedalData('SVK')
    
            // @ts-expect-error
            setData(response)
        } catch (e) {
            console.warn(e)
        } 
    } 
    
    useEffect(() => {
        fetcheddata()
    }, [])
    
    const notify = (message: any) => {
        if(message.length > 0) {
            toast(translate(message).toString())
        }
    };
    
    return (
        <>
                <div className="flag"><img src="SK.png" alt="Slovenská vlajka" /></div>
            <div className="container bratia">
                <img src="./olympic.png" alt="Olympijské kruhy" className="image" />
                
                    <h1 id="celkem" className="number">
                        {!data?.globalData.total ? <Skeleton variant="rounded" width={150} style={{marginTop: '1rem'}}/> : data?.globalData.total}
                    </h1>
    
                    <section className="subcontainer">
                    <article id="gold" onClick={() => notify(data?.medalDisciplines.gold)}>
                        <h2 style={{display: 'flex'}}>
                            🥇 {!data?.globalData ? <Skeleton style={{display: 'inline-block'}} variant='rounded' width={50}/> : data?.globalData.gold}
                            </h2>
                    </article>
                    <article id="silver" onClick={() => notify(data?.medalDisciplines.silver)}>
                        <h2 style={{display: 'flex'}}>
                            🥈 {!data?.globalData ? <Skeleton style={{display: 'inline-block'}} variant='rounded' width={50}/> : data?.globalData.silver}
                        </h2>
                    </article>
                    <article id="bronze" onClick={() => notify(data?.medalDisciplines.bronze)}>
                        <h2 style={{display: 'flex'}}>
                            🥉 {!data?.globalData ? <Skeleton style={{display: 'inline-block'}} variant='rounded' width={50}/> : data?.globalData.bronze}
                        </h2>
                    </article>
                </section>
    
            </div>
            <ToastContainer 
                position="top-center" 
            />
            <Analytics />
            <SpeedInsights />
        </> 
        
    )
    }
    
    export default Bratia
    