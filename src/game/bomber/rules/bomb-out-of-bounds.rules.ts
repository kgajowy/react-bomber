import { IGameState } from '../../../App'
import { ISprite } from '../../util/sprite'
import { ISpriteGatherable } from '../../util/sprite-gatherable'
import { CrossSprite } from '../bomb/Explosion'

export default ({ bombs, crosses, settings, lives, stats, bonuses }: IGameState): Partial<IGameState> => {
    const newBombs : ISprite[] = []
    const keptBonuses: ISpriteGatherable[] = bonuses.filter(b => b.y < settings.height - 20)
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
            ++stats.bombsMissed
        } else {
            newBombs.push(b)
        }
    }

    return {
        bombs: newBombs,
        crosses: [...crosses, ...newCrosses],
        lives: Math.max(0, lives),
        stats: {
            ...stats,
        },
        bonuses: keptBonuses,
    }
}