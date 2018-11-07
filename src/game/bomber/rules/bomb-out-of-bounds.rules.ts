import { IGameState } from '../../../App'
import { ISprite } from '../../util/sprite'
import { ISpriteGatherable } from '../../util/sprite-gatherable'
import { CrossSprite } from '../bomb/Explosion'

export default ({ bombs, settings, lives, stats, bonuses, shake, sprites }: IGameState): Partial<IGameState> => {
    const newBombs: ISprite[] = []
    const keptBonuses: ISpriteGatherable[] = bonuses.filter(b => b.y < settings.height - 20)
    const newCrosses: ISprite[] = []
    let triggerShake = false

    for (const b of bombs) {
        if (b.y > settings.height - 20) {
            newCrosses.push({
                x: b.x,
                y: b.y,
                w: CrossSprite.w,
                h: CrossSprite.h,
            })
            --lives
            ++stats.bombsMissed
            triggerShake = true
        } else {
            newBombs.push(b)
        }
    }

    return {
        bombs: newBombs,

        lives: Math.max(0, lives),
        stats: {
            ...stats,
        },
        bonuses: keptBonuses,
        shake: {
            ...shake,
            start: triggerShake,
        },
        sprites: {
            ...sprites,
            misc: {
                ...sprites.misc,
                crosses: [ ...sprites.misc.crosses, ...newCrosses ],
            }
        }
    }
}