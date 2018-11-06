import { ISprite } from '../../util/sprite'
import { createSprite } from '../../util/sprite-factory'
import sprite from './respect.svg';

export const Hands = (opts: ISprite) => createSprite(sprite, { ...opts })