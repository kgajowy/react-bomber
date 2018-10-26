import { IActiveBonus, IGameState } from '../../../App'
import { DropTypes } from '../../levels/level'
import { ISprite } from '../../util/sprite'
import { ISpriteGatherable } from '../../util/sprite-gatherable'

const spriteCollides = (sprite: ISprite, bucket: ISprite) =>
    sprite.x + sprite.w / 2 >= bucket.x - bucket.w / 2 &&
    sprite.x - sprite.w / 2 <= bucket.x + bucket.w / 2 &&
    sprite.y + sprite.h / 2 >= bucket.y - bucket.h / 2 &&
    sprite.y - sprite.h / 2 <= bucket.y + bucket.h / 2

const getBonusValue = (bonus: IActiveBonus, gameTime: number) => {
    return bonus.expires < gameTime ? 1 : bonus.value
}

export default ({ bombs, bucket, stats, bonuses, factors, gameTime }: IGameState): Partial<IGameState> => {
    const newBombs: ISprite[] = []
    const keptBonuses: ISpriteGatherable[] = []

    const doubleScoreBonus = factors.score

    for (const b of bombs) {
        if (!spriteCollides(b, bucket)) {
            newBombs.push(b)
        } else {
            ++stats.bombsCaught
            stats.points += 100 * (getBonusValue(factors.score, gameTime))
        }
    }

    for (const b of bonuses) {
        if (!spriteCollides(b, bucket)) {
            keptBonuses.push(b)
        } else {
            if (b.drop === DropTypes.BonusDoubleScore) {
                doubleScoreBonus.value = 2
                doubleScoreBonus.expires = gameTime + 3000  // TODO let it be configurable
            }
        }
    }

    return {
        factors: {
            ...factors,
            score: {
                ...factors.score,
                ...doubleScoreBonus,
            }
        },
        bombs: newBombs,
        stats: {
            ...stats,
        },
        bonuses: keptBonuses,
    }
}