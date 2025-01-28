import { matchDisciplines, reduceMedals } from "./reduceMedals";
import { CountryCode, MedalEntry, MedalResponse, ProcessedMedalData } from "./types";

// Simplified fetch function - let React Query handle the retries and error states
export async function fetchData<T>(url: string): Promise<T> {    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return await response.json();
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

// Simplified medal data fetching function
export async function fetchMedalData(countryCode: CountryCode): Promise<ProcessedMedalData> {
    const response = await fetchData<MedalResponse>(
        'https://olympics.com/OG2024/data/CIS_MedalNOCs~lang=ENG~comp=OG2024.json'
    );

    const filteredByCountry = filterByCountryAndGender(response.medalNOC, countryCode);
    const [nonGlobalData, globalData] = separateGlobalData(filteredByCountry);
    
    const categorizedMedals = reduceMedals(nonGlobalData);
    const medalDisciplines = await matchDisciplines(categorizedMedals) || {
        gold: [],
        silver: [],
        bronze: []
    };

    // Transform globalData to ensure it matches the expected type
    const formattedGlobalData = {
        total: globalData?.total || 0,
        gold: globalData?.gold || 0,
        silver: globalData?.silver || 0,
        bronze: globalData?.bronze || 0
    };

    return {
        medalDisciplines,
        globalData: formattedGlobalData
    };
}
