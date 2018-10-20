import { Direction } from '../../util/direction'
import { ISprite } from '../../util/sprite'
import { createSprite } from '../../util/sprite-factory'
import sprite from './bomb.svg'

export const Bomb = (opts: ISprite) => createSprite(sprite, { ...opts, w: 64, h: 64, direction: Direction.Down, speed: 200 })
