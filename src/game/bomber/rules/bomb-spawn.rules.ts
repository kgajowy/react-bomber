import { IGameState } from '../../../App'
import { Direction } from '../../util/direction'
import { BombSprite } from '../bomb/Bomb'

export default ({ gameTime, bombs, hands, level }: IGameState): Partial<IGameState> => {
    if (!level || level.spawns.bombs.length === 0) {
        return {}
    }
    const nextEvent = level.spawns.bombs[ 0 ]

    if (nextEvent.time <= gameTime) {
        level.spawns.bombs.shift()
        return {
            bombs: [ ...bombs, { x: hands.x, y: hands.y, speed: nextEvent.speed, direction: Direction.Down, w: BombSprite.w, h: BombSprite.h } ],
            level: { ...level, spawns: { ...level.spawns, bombs: level.spawns.bombs } }
        }
    } else {
        return { bombs: [ ...bombs ] }
    }

}