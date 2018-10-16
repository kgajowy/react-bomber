// @ts-ignore
import { ISprite } from '../../util/sprite'
import { createSprite } from '../../util/sprite-factory'
import sprite from './cross.svg'

export const Explosion = ({scale = 1, y, ...rest}: ISprite) =>
    createSprite(sprite, { ...rest, w: 16 * scale, h: 16 * scale, y: y+32})

