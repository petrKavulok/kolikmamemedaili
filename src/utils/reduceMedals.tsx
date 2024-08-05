import { fetchData } from "./fetchData";

// @ts-expect-error
export function reduceMedals(data): {gold: string[], silver: string[], bronze: string[]} {
  // @ts-expect-error
    const medalsObject = data.reduce((acc, curr) => {
        if (curr.gold > 0) {
          acc.gold.push(curr.sport);
        }
        if (curr.silver > 0) {
          acc.silver.push(curr.sport);
        }
        if (curr.bronze > 0) {
          acc.bronze.push(curr.sport);
        }
        return acc;
      }, { gold: [], silver: [], bronze: [] });
    
    return medalsObject
}

// @ts-expect-error
export async function matchDisciplines(data) {
  const response = await fetchData('https://olympics.com/OG2024/data/GLO_Disciplines~comp=OG2024~lang=ENG.json');
  
  // Create a mapping of sport codes to their descriptions
  // @ts-expect-error
  const sportCodeToDescription = response.disciplines.reduce((acc, discipline) => {
    if (discipline.isSport) {
      acc[discipline.code] = discipline.description;
    }
    return acc;
  }, {});
  
  // Transform the medals object
  // @ts-expect-error
  const transformMedalsObject = (medalsObj, codeToDesc) => {
    return Object.keys(medalsObj).reduce((acc, medalType) => {
          // @ts-expect-error
        acc[medalType] = medalsObj[medalType].map(code => codeToDesc[code] || code);
        return acc;
        }, {});
    };
    
    const transformedMedalsObject = transformMedalsObject(data, sportCodeToDescription);
    
    return transformedMedalsObject
}