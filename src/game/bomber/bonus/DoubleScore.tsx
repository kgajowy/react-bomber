import { Direction } from '../../util/direction'
import { ISprite } from '../../util/sprite'
import { createSprite } from '../../util/sprite-factory'
import sprite from './coin.svg'

export const DoubleScoreSprite = {
    w: 48,
    h: 48,
}

export const DoubleScore = (opts: ISprite) => createSprite(sprite, {
    ...opts,
    w: DoubleScoreSprite.w,
    h: DoubleScoreSprite.h,
    direction: Direction.Down,
    speed: 200
})