import { DropTypes, ILevel } from './level'

const levelOne: ILevel = {
    name: 'Level 1',
    triggers: [
        { time: 0, x: 50 },
        { time: 2000, x: 30 },
        { time: 5000, x: 70 },
        ...new Array(5000/500).fill(0).map((_, i) => ({time: i*500, drop: DropTypes.Bomb, speed: 150})),
    ]
}

const levelTwo: ILevel = {
    name: 'Level 2',
    triggers: [
        { time: 0, x: 50 },
        { time: 2000, x: 30 },
        { time: 5000, x: 70 },
        ...new Array(5000/500).fill(0).map((_, i) => ({time: i*500, drop: DropTypes.Bomb, speed: 150})),
    ]
}


export const Campaign = {
    levels: [
        levelOne, levelTwo
    ]
}