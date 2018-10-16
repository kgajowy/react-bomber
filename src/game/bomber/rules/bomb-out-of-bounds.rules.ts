import { IGameState } from '../../../App'
import { ISprite } from '../../util/sprite'

export default ({ bombs, crosses, settings, lives }: IGameState): Partial<IGameState> => {
    const newBombs : ISprite[] = []
    const newCrosses: ISprite[] = []

    for (const b of bombs) {
        if (b.y > settings.height - 50) {
            newCrosses.push({
                x: b.x,
                y: b.y,
            })
            --lives
        } else {
            newBombs.push(b)
        }
    }

    return {
        bombs: newBombs,
        crosses: [...crosses, ...newCrosses],
        lives: Math.max(0, lives),
    }
}