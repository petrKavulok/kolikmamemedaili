const sporty = {
    Fencing: 'Šerm',
    Tennis: 'Tenis',
    'Canoe Slalom': 'Kajak slalom',
    'Canoe Sprint': 'Rychlostní kanoistika'
} as const

export const translate = (sport: any): string[] => {
    // @ts-expect-error
    const arr = []
    sport.map((el: keyof typeof sporty) => {
        // console.log(el, sporty[el])
        if(sporty[el]) {
            arr.push(sporty[el])
        } else {
            arr.push(el)
        } 
    })
    
    // @ts-expect-error
    return arr
}