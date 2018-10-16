import { ISprite } from '../../util/sprite'
import { createSprite } from '../../util/sprite-factory'
// @ts-ignore
import sprite from './bomb.svg'

export const Bomb = (opts: ISprite) => createSprite(sprite, { ...opts, w: 64, h: 64 })
