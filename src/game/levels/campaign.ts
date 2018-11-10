import { DropTypes, ILevel } from './level'

const levelOne: ILevel = {
    name: 'Level 1',
    triggers: [
        { time: 0, x: 50 },
        { time: 2000, x: 30 },
        { time: 2300, x: 10 },
        { time: 2600, x: 30 },
        { time: 5000, x: 70 },
        { time: 2300, drop: DropTypes.BonusDoubleScore, speed: 300, duration: 3000 },
        ...new Array(5000 / 500).fill(0).map((_, i) => ({ time: i * 500, drop: DropTypes.Bomb, speed: 150 })),
    ]
}

const levelTwo: ILevel = {
    name: 'Level 2',
    triggers: [
        { time: 0, x: 50 },
        { time: 2000, x: 30 },
        { time: 5000, x: 70 },
        ...new Array(5000 / 500).fill(0).map((_, i) => ({ time: i * 500, drop: DropTypes.Bomb, speed: 150 })),
    ]
}

const level3: ILevel = {
    name: 'Level 3',
    triggers: [
        { time: 0, x: 70 },
        { time: 2500, x: 10 },
        { time: 3250, drop: DropTypes.BonusDoubleScore, speed: 300, duration: 3000 },
        { time: 4000, x: 90 },
        { time: 6500, x: 10 },
        ...new Array(6500 / 650).fill(0).map((_, i) => ({ time: i * 500, drop: DropTypes.Bomb, speed: 150 })),
    ]
}

const level4: ILevel = {
    name: 'Level 4',
    triggers: [
        { time: 0, x: 10 },
        { time: 2000, x: 90 },
        { time: 4000, x: 10 },
        { time: 6000, x: 90 },
        { time: 9000, x: 10 },
        { time: 100, drop: DropTypes.Bomb, speed: 150 },
        { time: 2000, drop: DropTypes.Bomb, speed: 250 },
        { time: 4000, drop: DropTypes.Bomb, speed: 350 },
        { time: 6000, drop: DropTypes.Bomb, speed: 450 },
        { time: 7000, drop: DropTypes.Bomb, speed: 450 },
        { time: 8000, drop: DropTypes.Bomb, speed: 450 },
        { time: 9000, drop: DropTypes.Bomb, speed: 450 },
    ]
}


const level5: ILevel = {
    name: 'Level 5',
    triggers: [
        { time: 0, x: 10 },
        { time: 1250, x: 90 },
        { time: 2500, x: 10 },
        { time: 3750, x: 90 },
        { time: 5000, x: 10 },
        ...new Array(5000 / 250).fill(0).map((_, i) => ({ time: i * 250, drop: DropTypes.Bomb, speed: 575 })),
    ]
}


const level6: ILevel = {
    name: 'Level 6',
    triggers: [
        { time: 0, x: 10 },
        { time: 1000, x: 90 },
        { time: 2000, x: 10 },
        { time: 3000, x: 90 },
        { time: 3500, x: 10 },
        { time: 3800, x: 90 },
        { time: 4000, x: 10 },
        { time: 4250, x: 50 },
        { time: 4500, x: 10 },
        { time: 4750, x: 50 },
        { time: 5000, x: 10 },
        ...new Array(5000 / 100).fill(0).map((_, i) => ({ time: i * 100, drop: DropTypes.Bomb, speed: 650 })),
    ]
}


export const Campaign = {
    levels: [
        levelOne, levelTwo, level3, level4, level5, level6
    ]
}