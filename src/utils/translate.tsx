// todo: add more sports
const sporty = {
    Fencing: 'Šerm',
    Tennis: 'Tenis',
    'Canoe Slalom': 'Kajak slalom',
    'Canoe Sprint': 'Rychlostní kanoistika'
} as const

type SportKey = keyof typeof sporty;

export const translate = (sports: SportKey[] | string[]): string[] => {
    if (!Array.isArray(sports)) {
        return [];
    }

    return sports.map((sport) => sporty[sport as SportKey] || sport);
}