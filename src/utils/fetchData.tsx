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

// Helper functions
const filterByCountryAndGender = (data: MedalEntry[], countryCode: CountryCode): MedalEntry[] => {
    return data.filter(entry => entry.org === countryCode && entry.gender === 'TOT');
};

const separateGlobalData = (data: MedalEntry[]): [MedalEntry[], MedalEntry | null] => {
    const nonGlobalData = data.filter(el => el.sport !== 'GLO');
    const globalData = data.find(el => el.sport === 'GLO') || null;
    return [nonGlobalData, globalData];
};

// Is hardcoded due to API not working
const formattedGlobalData = {
    CZE: {
        total: 5,
        gold: 3,
        silver: 0,
        bronze: 2
    },
    SVK: {
        total: 1,
        gold: 0,
        silver: 0,
        bronze: 1
    },
}

const medalDisciplines = {
    CZE: {
        gold: ['Tenis (smíšená čtyřhra)', 'Rychlostní kanoistika (C1 1000m)', 'Rychlostní kanoistika (K1 1000m)'],
        silver: [],
        bronze: ['Šerm (tým kord)', 'Atletika (hod oštěpem)']
    },
    SVK: {
        gold: [],
        silver: [],
        bronze: ['Kanoistika']
    }
}

// Simplified medal data fetching function
export async function fetchMedalData(countryCode: CountryCode): Promise<ProcessedMedalData> {

    // API stopped working
    // TODO: find a new source

    // const response = await fetchData<MedalResponse>(
    //     'https://olympics.com/OG2024/data/CIS_MedalNOCs~lang=ENG~comp=OG2024.json'
    // );

    // const filteredByCountry = filterByCountryAndGender(response.medalNOC, countryCode);
    // const [nonGlobalData, globalData] = separateGlobalData(filteredByCountry);
    
    // const categorizedMedals = reduceMedals(nonGlobalData);
    // const medalDisciplines = await matchDisciplines(categorizedMedals) || {
    //     gold: [],
    //     silver: [],
    //     bronze: []
    // };

    // // Transform globalData to ensure it matches the expected type
    // const formattedGlobalData = {
    //     total: globalData?.total || 0,
    //     gold: globalData?.gold || 0,
    //     silver: globalData?.silver || 0,
    //     bronze: globalData?.bronze || 0
    // };

    return {
        medalDisciplines: medalDisciplines[countryCode],
        globalData: formattedGlobalData[countryCode]
    };
}
