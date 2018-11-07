import { ISprite } from '../../util/sprite'
import { createSprite } from '../../util/sprite-factory'
import sprite from './raindrop.svg'

export const WaterDropSprite = {
    w: 16,
    h: 16,
}

export const WaterDrop = (opts: ISprite) =>
    createSprite(sprite, { ...opts, w: WaterDropSprite.w, h: WaterDropSprite.h })