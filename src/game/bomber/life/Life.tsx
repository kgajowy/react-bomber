import { ISprite } from '../../util/sprite'
import { createSprite } from '../../util/sprite-factory'
import sprite from './heart.svg'

export const Life = (opts: ISprite) => createSprite(sprite, { ...opts, w: 32, h: 32 })