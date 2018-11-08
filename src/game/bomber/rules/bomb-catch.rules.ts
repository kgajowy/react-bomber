import { IActiveBonus, IGameState } from '../../../App'
import { DropTypes } from '../../levels/level'
import { Direction } from '../../util/direction'
import { ISprite } from '../../util/sprite'
import { ISpriteGatherable } from '../../util/sprite-gatherable'
import { WaterDropSprite } from '../drops/WaterDrop'
import { StarSprite } from '../star/Star'

const spriteCollides = (sprite: ISprite, bucket: ISprite) =>
    sprite.x + sprite.w / 2 >= bucket.x - bucket.w / 2 &&
    sprite.x - sprite.w / 2 <= bucket.x + bucket.w / 2 &&
    sprite.y + sprite.h / 2 >= bucket.y - bucket.h / 2 &&
    sprite.y - sprite.h / 2 <= bucket.y + bucket.h / 2

const getBonusValue = (bonus: IActiveBonus, gameTime: number) => {
    return bonus.expires < gameTime ? 1 : bonus.value
}

export default ({ bombs, bucket, stats, bonuses, factors, gameTime, sprites }: IGameState): Partial<IGameState> => {
    const newBombs: ISprite[] = []
    const keptBonuses: ISpriteGatherable[] = []
    let newStars: ISprite[] = []
    const waterDrops: ISprite[] = []

    const doubleScoreBonus = factors.score

    for (const b of bombs) {
        if (!spriteCollides(b, bucket)) {
            newBombs.push(b)
        } else {
            ++stats.bombsCaught
            stats.points += 100 * (getBonusValue(factors.score, gameTime))
            waterDrops.push({
                x: bucket.x - WaterDropSprite.w,
                y: bucket.y - bucket.h /2 + WaterDropSprite.h/2,
                w: WaterDropSprite.w,
                h: WaterDropSprite.h,
                direction: Direction.Left,
                angle: Math.random()*360,
                speed: Math.random()*80
            }, {
                x: bucket.x - WaterDropSprite.w / 2,
                y: bucket.y - bucket.h /2 + WaterDropSprite.h/2,
                w: WaterDropSprite.w,
                h: WaterDropSprite.h,
                direction: Direction.Left,
                angle: Math.random()*360,
                speed: Math.random()*80
            }, {
                x: bucket.x,
                y: bucket.y - bucket.h /2 + WaterDropSprite.h/2,
                w: WaterDropSprite.w,
                h: WaterDropSprite.h,
                angle: Math.random()*360,
                speed: Math.random()*80
            }, {
                x: bucket.x,
                y: bucket.y - bucket.h /2 + WaterDropSprite.h/2,
                w: WaterDropSprite.w,
                h: WaterDropSprite.h,
                direction: Direction.Left,
                angle: Math.random()*360,
                speed: Math.random()*80
            }, {
                x: bucket.x,
                y: bucket.y - bucket.h /2 + WaterDropSprite.h/2,
                w: WaterDropSprite.w,
                h: WaterDropSprite.h,
                direction: Direction.Right,
                angle: Math.random()*360,
                speed: Math.random()*80
            }, {
                x: bucket.x + WaterDropSprite.w / 2,
                y: bucket.y - bucket.h /2 + WaterDropSprite.h/2,
                w: WaterDropSprite.w,
                h: WaterDropSprite.h,
                direction: Direction.Right,
                angle: Math.random()*360,
                speed: Math.random()*80
            }, {
                x: bucket.x + WaterDropSprite.w,
                y: bucket.y - bucket.h /2 + WaterDropSprite.h/2,
                w: WaterDropSprite.w,
                h: WaterDropSprite.h,
                direction: Direction.Right,
                angle: Math.random()*360,
                speed: Math.random()*80
            })
        }
    }

    for (const b of bonuses) {
        if (!spriteCollides(b, bucket)) {
            keptBonuses.push(b)
        } else {
            if (b.drop.drop === DropTypes.BonusDoubleScore) {
                doubleScoreBonus.value = 2
                doubleScoreBonus.expires = gameTime + (b.drop.duration || 0)
                newStars = [ ...newStars, {
                    x: b.x - StarSprite.w / 2,
                    y: b.y,
                    w: StarSprite.w,
                    h: StarSprite.h,
                    direction: Direction.Left,
                    speed: 50,
                }, {
                    x: b.x,
                    y: b.y,
                    w: StarSprite.w,
                    h: StarSprite.h,
                    speed: 50,
                }, {
                    x: b.x + StarSprite.w / 2,
                    y: b.y,
                    w: StarSprite.w,
                    h: StarSprite.h,
                    direction: Direction.Right,
                    speed: 50,
                } ]
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
        sprites: {
            ...sprites,
            misc: {
                ...sprites.misc,
                stars: [ ...sprites.misc.stars, ...newStars ],
                drops: [ ...sprites.misc.drops, ...waterDrops ]
            }
        }

    }
}