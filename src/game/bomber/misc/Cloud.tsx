import { ISprite } from '../../util/sprite'
import { createSprite } from '../../util/sprite-factory'

import sprite from './cloud.svg'

export const Cloud = (opts: ISprite) => createSprite(sprite, { ...opts})