import { IMiscSprites } from '../../../../App'

export const resetMiscSprites = (): IMiscSprites => ({
    crosses: [],
    stars: [],
    drops: [],
    clouds: new Array(20).fill(0).map(_ => ({
        x: Math.random() * 800,
        y: Math.random() * 50 + 32,
        w: Math.random() * 200 + 32,
        h: Math.random() * 100 + 16,
        speed: Math.random() * 100 + 30,
    })),
})