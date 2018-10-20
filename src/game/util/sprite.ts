import { Direction } from './direction'

export interface ISprite {
    y: number
    x: number
    h?: number
    w?: number
    scale?: number
    opacity?: number
    direction?: Direction
    speed?: number
}