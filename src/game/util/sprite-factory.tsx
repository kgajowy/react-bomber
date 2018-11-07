import * as React from 'react'
import { ISprite } from './sprite'

export const createSprite = (spriteSource: string, { x, y, w = 32, h = 32, debug, ...rest }: ISprite) => (
    <>
        <image
            x={x - w / 2}
            y={y - h / 2}
            height={h}
            width={w}
            {...rest}
            xlinkHref={spriteSource}
            transform={rest.angle ? `rotate(${rest.angle} ${x + w/2} ${y + h/2})` : ''}
        />

        {debug && <rect width={w} height={h} x={x - w / 2} y={y - h / 2}
                        style={{ strokeWidth: 1, stroke: 'red', fill: 'transparent' }}/>}
        {debug && <circle cx={x} cy={y} r={5} style={{ strokeWidth: 1, stroke: 'red', fill: 'transparent' }}/>}
    </>
)