import { IGameState } from '../../../App'
import { ISprite } from '../../util/sprite'
import { CrossSprite } from '../bomb/Explosion'

export default ({ bombs, crosses, settings, lives }: IGameState): Partial<IGameState> => {
    const newBombs : ISprite[] = []
    const newCrosses: ISprite[] = []

    for (const b of bombs) {
        if (b.y > settings.height-20) {
            newCrosses.push({
                x: b.x,
                y: b.y,
                w: CrossSprite.w,
                h: CrossSprite.h,
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