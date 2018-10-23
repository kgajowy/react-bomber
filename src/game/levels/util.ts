import { isBombEvent, isDropEvent, isMoveEvent } from '../util/types'
import { IDrop, ILevel, IMove } from './level'

export  interface IRunningLevel {
    ref: ILevel,
    spawns: {
        bombs: IDrop[],
        bonuses: IDrop[],
    },
    moves: IMove[]
}

export const prepareLevel = (source: ILevel) : IRunningLevel => {
    return {
        ref: source,
        spawns: {
            bombs: source.triggers.filter(event => isDropEvent(event) && isBombEvent(event)) as IDrop[],
            bonuses: [],
        },
        moves: source.triggers.filter(event => isMoveEvent(event)) as IMove[],
    }
}