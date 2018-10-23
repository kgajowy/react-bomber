import { IGameState } from '../../../App'
import { prepareLevel } from '../../levels/util'

export default ({ bombs, level, levels }: IGameState): Partial<IGameState> => {
    if (!level) {
        return {}
    }

    if (level.moves.length === 0 &&
        level.spawns.bombs.length === 0 &&
        level.spawns.bonuses.length === 0 &&
        bombs.length === 0
    ) {
        if (levels.length === 0) {
            // finish game
            return {
                won: true,
            }
        } else {
            // next level
            const [nextLevel, ...rest] = levels
            return {
                level: prepareLevel(nextLevel),
                levels: rest,
                gameTime: 0,
            }
        }

    }

    return {}
}