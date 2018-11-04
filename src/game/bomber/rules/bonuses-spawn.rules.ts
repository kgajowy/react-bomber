import { IGameState } from '../../../App'
import { Direction } from '../../util/direction'
import { DoubleScoreSprite } from '../bonus/DoubleScore'

export default ({ gameTime, bonuses, hands, level }: IGameState): Partial<IGameState> => {
    if (!level || level.spawns.bonuses.length === 0) {
        return {}
    }
    const nextEvent = level.spawns.bonuses[ 0 ]

    // TODO diff between bonuses types ? how ?
    if (nextEvent.time <= gameTime) {
        level.spawns.bonuses.shift()
        return {
            bonuses: [ ...bonuses, {
                x: hands.x,
                y: hands.y,
                speed: nextEvent.speed,
                direction: Direction.Down,
                w: DoubleScoreSprite.w,
                h: DoubleScoreSprite.h,
                drop: nextEvent,
            } ],
            level: { ...level, spawns: { ...level.spawns, bombs: level.spawns.bombs } }
        }
    } else {
        return { bonuses: [ ...bonuses ] }
    }

}