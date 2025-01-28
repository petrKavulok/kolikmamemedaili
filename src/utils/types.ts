export type CountryCode = 'CZE' | 'SVK';

export interface MedalEntry {
  org: string;
  gender: string;
  sport: string;
  gold?: number;
  silver?: number;
  bronze?: number;
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

// Added interfaces from reduceMedals.tsx
export interface MedalTally {
  gold: string[];
  silver: string[];
  bronze: string[];
}

export interface Discipline {
  code: string;
  description: string;
  isSport: boolean;
}

export interface DisciplineResponse {
  disciplines: Discipline[];
}

export interface SportCodeMapping {
  [key: string]: string;
} 