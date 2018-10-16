import * as React from 'react'
import { ISprite } from './sprite'

export const createSprite = (spriteSource: string, {x, y, w = 32, h = 32, ...rest}: ISprite) => (
    <image
        x={x - w/2}
        y={y - h/2}
        height={h}
        width={w}
        {...rest}
        xlinkHref={spriteSource}
    />
)