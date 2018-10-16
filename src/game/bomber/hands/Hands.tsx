import { ISprite } from '../../util/sprite'
import { createSprite } from '../../util/sprite-factory'
import sprite from './hands.png';

export const Hands = (opts: ISprite) => createSprite(sprite, { ...opts })