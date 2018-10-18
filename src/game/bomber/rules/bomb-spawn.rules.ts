import { IGameState } from '../../../App'

export default ({ gameTime, bombs, hands, level }: IGameState): Partial<IGameState> => {
    if (level.spawns.bombs.length === 0) {
        return {}
    }
    const nextEvent = level.spawns.bombs[ 0 ]

    if (nextEvent.time <= gameTime) {
        level.spawns.bombs.shift()
        return {
            bombs: [ ...bombs, { x: hands.x, y: hands.y } ],
            level: { ...level, spawns: { ...level.spawns, bombs: level.spawns.bombs } }
        }
    } else {
        return { bombs: [ ...bombs ] }
    }

}