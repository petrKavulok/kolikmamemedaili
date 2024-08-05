import { matchDisciplines, reduceMedals } from "./reduceMedals";

export async function fetchData(url: string) {    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export async function fetchMedalData() {
    const response = await fetchData('https://olympics.com/OG2024/data/CIS_MedalNOCs~lang=ENG~comp=OG2024.json');
    
    // filter only czech medals regardless of gender
    // @ts-expect-error
    const filtered = response['medalNOC'].filter(entry => entry.org === 'CZE' && entry.gender === 'TOT')
    
    // reduce specific cports for specific medals for all sports but 'GLO'bal medals
    // @ts-expect-error
    const categorizedMedals = reduceMedals(filtered.filter(el => el.sport !== 'GLO'))
    
    const medalDisciplines = await matchDisciplines(categorizedMedals)
    
    // @ts-expect-error
    return {medalDisciplines, globalData: filtered.filter(el => el.sport === 'GLO')[0]}
}
