import { ISprite } from '../../util/sprite'
import { createSprite } from '../../util/sprite-factory'
import sprite from './star.svg'

export const StarSprite = {
    w: 48,
    h: 48,
}

export const Star = (opts: ISprite) =>
    createSprite(sprite, { ...opts, w: StarSprite.w, h: StarSprite.h })