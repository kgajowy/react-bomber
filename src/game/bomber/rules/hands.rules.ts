import { IGameState } from '../../../App'

export default ({ gameTime, deltaTime, hands, level, settings }: IGameState): Partial<IGameState> => {
    if (level.moves.length === 0) {
        return {}
    }

    const movesSet = level.moves

    if (gameTime > level.moves[0].time ) {
        // TODO next move
        movesSet.shift()
    }

    if (level.moves.length === 0) {
        return {}
    }

    const currentMove = movesSet[ 0 ]
    const timeDiff = Math.abs(currentMove.time - gameTime)
    const xDiff = (currentMove.x * settings.width / 100) - hands.x

    const timeRatio = deltaTime / timeDiff
    const deltaMove = xDiff * timeRatio

    return {
        hands: {
            ...hands,
            x: hands.x + deltaMove
        },
        level: {
            ...level,
            moves: movesSet
        }
    }
}