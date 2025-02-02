import { fetchData } from "./fetchData";
import { MedalEntry, MedalTally, DisciplineResponse, SportCodeMapping } from "./types";

export function reduceMedals(data: MedalEntry[]): MedalTally {
    const medalsObject = data.reduce<MedalTally>((acc, curr) => {
        if (curr.gold && curr.gold > 0) {
          acc.gold.push(curr.sport);
        }
        if (curr.silver && curr.silver > 0) {
          acc.silver.push(curr.sport);
        }
        if (curr.bronze && curr.bronze > 0) {
          acc.bronze.push(curr.sport);
        }
        return acc;
      }, { gold: [], silver: [], bronze: [] });
    
    return medalsObject;
}

interface Discipline {
  code: string;
  description: string;
  isSport: boolean;
}

export async function matchDisciplines(data: MedalTally): Promise<MedalTally> {
  const response = await fetchData<DisciplineResponse>(
    'https://olympics.com/OG2024/data/GLO_Disciplines~comp=OG2024~lang=ENG.json'
  );
  
  // Create a mapping of sport codes to their descriptions
  const sportCodeToDescription = response.disciplines.reduce<SportCodeMapping>((acc, discipline) => {
    if (discipline.isSport) {
      acc[discipline.code] = discipline.description;
    }
    return acc;
  }, {});
  
  // Transform the medals object
  const transformMedalsObject = (medalsObj: MedalTally, codeToDesc: SportCodeMapping): MedalTally => {
    return (Object.keys(medalsObj) as Array<keyof MedalTally>).reduce<MedalTally>((acc, medalType) => {
        acc[medalType] = medalsObj[medalType].map(code => codeToDesc[code] || code);
        return acc;
    }, { gold: [], silver: [], bronze: [] });
  };
    
  const transformedMedalsObject = transformMedalsObject(data, sportCodeToDescription);
    
  return transformedMedalsObject;
}