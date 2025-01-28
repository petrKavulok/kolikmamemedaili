export type CountryCode = 'CZE' | 'SVK';

export interface MedalEntry {
  org: string;
  gender: string;
  sport: string;
  [key: string]: any; // for other properties that might exist
}

export interface MedalResponse {
  medalNOC: MedalEntry[];
}

export interface ProcessedMedalData {
  medalDisciplines: {
    gold: string[]
    silver: string[]
    bronze: string[]
  }
  globalData: {
    total: number
    gold: number
    silver: number
    bronze: number
  }
} 