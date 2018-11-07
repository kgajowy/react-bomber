import { ISprite } from '../../util/sprite'
import { createSprite } from '../../util/sprite-factory'
import sprite from './bucket_fill.svg';

export const Bucket = (opts: ISprite) => createSprite(sprite, { ...opts })