// @ts-ignore
import { ISprite } from '../../util/sprite'
import { createSprite } from '../../util/sprite-factory'
import sprite from './cross.svg'

export const CrossSprite = {
    w: 16,
    h: 16,
}

export const Explosion = ({scale = 1, y, ...rest}: ISprite) =>
    createSprite(sprite, { ...rest, w: CrossSprite.w * scale, h: CrossSprite.h * scale, y: y+32})

