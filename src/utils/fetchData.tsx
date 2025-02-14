import { reduceMedals } from "./reduceMedals";
import { CountryCode, MedalEntry, MedalTally, ProcessedMedalData } from "./types";


export async function fetchData<T>(url: string): Promise<T> {    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return await response.json();
}

// Helper functions
const filterByCountry = (data: MedalEntry[], countryCode: CountryCode): MedalEntry[] => {
    return data.filter(entry => 
        entry.country_code === countryCode
    );
};

const processMedalData = (entries: MedalEntry[]): MedalEntry[] => {
    return entries.map(entry => ({
        ...entry,
        sport: entry.code_discipline,
        gold: entry.medal_type === 'Gold Medal' ? 1 : 0,
        silver: entry.medal_type === 'Silver Medal' ? 1 : 0,
        bronze: entry.medal_type === 'Bronze Medal' ? 1 : 0
    }));
};

const calculateGlobalData = (entries: MedalEntry[]) => {
    return entries.reduce((acc, entry) => ({
        total: acc.total + 1,
        gold: acc.gold + (entry.medal_type === 'Gold Medal' ? 1 : 0),
        silver: acc.silver + (entry.medal_type === 'Silver Medal' ? 1 : 0),
        bronze: acc.bronze + (entry.medal_type === 'Bronze Medal' ? 1 : 0)
    }), {
        total: 0,
        gold: 0,
        silver: 0,
        bronze: 0
    });
};

// Simplified medal data fetching function
export async function fetchMedalData(countryCode: CountryCode): Promise<ProcessedMedalData | undefined> {
    try {
        const response = await fetchData<MedalEntry[]>(
            'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/paris-2024-results-medals-oly-eng/exports/json'
        );

        const filteredByCountry = filterByCountry(response, countryCode);

        const processedEntries = processMedalData(filteredByCountry);

        const categorizedMedals = reduceMedals(processedEntries);

        const globalData = calculateGlobalData(processedEntries);


        return {
            categorizedMedals,
            globalData
        };
    } catch (error) {
        console.error('Error fetching medal data:', error);
    }
}
