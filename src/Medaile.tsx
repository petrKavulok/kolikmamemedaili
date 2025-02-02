import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { translate } from './utils/translate'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useMedalData } from './hooks/useMedalData'
import './index.css'
import './bratia.css'

type CountryCodeProps = {
    countryCode: 'CZE' | 'SVK'
}

function Medaile({countryCode}: CountryCodeProps) {
    const { data, isLoading, error } = useMedalData(countryCode)
    
    const notify = (message: string[]) => {
        if (message?.length > 0) {
            toast(translate(message).toString())
        } else {
            toast('Zatím nic :/')
        }
    }
    
    if (error) {
        return <div>Failed to load medal data</div>
    }
    
    return (
        <>
            {countryCode === 'SVK' && <div className="flag" />}
            <div className={`container ${countryCode === 'SVK' ? 'bratia' : ''}`}>
                <img src="./olympic.png" alt="Olympijské kruhy" className="image" />
                
                <h1 id="celkem" className="number">
                    {isLoading || !data?.globalData?.total ? 
                        <Skeleton variant="rounded" width={150} style={{marginTop: '1rem'}}/> : 
                        data.globalData.total
                    }
                </h1>
    
                <section className="subcontainer">
                    <article id="gold" onClick={() => notify(data?.medalDisciplines.gold || [])}>
                        <h2 style={{display: 'flex'}}>
                            🥇 {isLoading || !data?.globalData ? 
                                <Skeleton style={{display: 'inline-block'}} variant='rounded' width={50}/> : 
                                data.globalData.gold
                            }
                        </h2>
                    </article>
                    <article id="silver" onClick={() => notify(data?.medalDisciplines.silver || [])}>
                        <h2 style={{display: 'flex'}}>
                            🥈 {isLoading || !data?.globalData ? 
                                <Skeleton style={{display: 'inline-block'}} variant='rounded' width={50}/> : 
                                data.globalData.silver
                            }
                        </h2>
                    </article>
                    <article id="bronze" onClick={() => notify(data?.medalDisciplines.bronze || [])}>
                        <h2 style={{display: 'flex'}}>
                            🥉 {isLoading || !data?.globalData ? 
                                <Skeleton style={{display: 'inline-block'}} variant='rounded' width={50}/> : 
                                data.globalData.bronze
                            }
                        </h2>
                    </article>
                </section>
            </div>
            
            <ToastContainer position="top-center" />
            <Analytics />
            <SpeedInsights />

            <div className='link'>
                {countryCode === 'SVK' ?
                    <Link style={{color: 'lightgray'}} to='/'>Ako si vedú bratia?</Link> :
                    <Link style={{color: 'lightgray'}} to='/bratia'>Jak jsou na tom bratia?</Link>
                }
            </div>
        </>  
    )
}

export default Medaile
    