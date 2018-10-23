import * as React from 'react'
import { Direction } from '../../util/direction'
import { ISprite } from '../../util/sprite'
import { createSprite } from '../../util/sprite-factory'
import spriteFire from './bomb-fire.svg'
import sprite from './bomb.svg'

export const BombSprite = {
    w: 48,
    h: 48,
}

export const Bomb = (opts: ISprite) =>
    <>
        {createSprite(sprite, { ...opts, w: BombSprite.w, h: BombSprite.h, direction: Direction.Down, speed: 200 })}
        {createSprite(spriteFire, { ...opts, w: BombSprite.w, h: BombSprite.h, direction: Direction.Down, speed: 200, debug: false })}
    </>