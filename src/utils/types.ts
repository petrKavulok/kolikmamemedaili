export type CountryCode = 'CZE' | 'SVK';

export interface MedalEntry {
  code_discipline: string;
  country: string;
  country_code: string;
  discipline: string;
  event: string;
  gender: string;
  medal_code: number;
  medal_date: string;
  medal_type: string;
  name: string;
  url_event: string;
}

// Added interfaces from reduceMedals.tsx
export interface MedalTally {
  gold: MedalEntry[];
  silver: MedalEntry[];
  bronze: MedalEntry[];
}

export interface ProcessedMedalData {
  categorizedMedals: {
    gold: MedalEntry[]
    silver: MedalEntry[]
    bronze: MedalEntry[]
  }
  globalData: {
    total: number
    gold: number
    silver: number
    bronze: number
  }
}