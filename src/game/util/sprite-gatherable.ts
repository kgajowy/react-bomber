import { DropTypes } from '../levels/level'
import { ISprite } from './sprite'

export interface ISpriteGatherable extends ISprite {
    drop: DropTypes
}