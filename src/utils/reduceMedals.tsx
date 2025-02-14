import { MedalEntry, MedalTally, } from "./types";

export function reduceMedals(data: MedalEntry[]): MedalTally {
    const medalsObject = data.reduce<MedalTally>((acc, curr) => {
        if (curr.medal_type === 'Gold Medal') {
          acc.gold.push(curr);
        }
        if (curr.medal_type === 'Silver Medal') {
          acc.silver.push(curr);
        }
        if (curr.medal_type === 'Bronze Medal') {
          acc.bronze.push(curr);
        }
        return acc;
      }, { gold: [], silver: [], bronze: [] });
    
    return medalsObject;
}
