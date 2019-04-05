import { IGameState } from '../../../App'
import { Direction } from '../../util/direction'

const starMoveX = (deltaTime: number, currentX: number, direction: Direction = Direction.Up, speed: number) : number => {
    if (direction === Direction.Left) {
        return currentX - (speed) * deltaTime / 1000
    } else  if (direction === Direction.Right ) {
        return currentX + (speed) * deltaTime / 1000
    } else {
        return currentX
    }
}

export default ({ deltaTime, settings, bonuses, bombs, sprites }: IGameState): Partial<IGameState> => ({
    bonuses: bonuses.map(b => ({
        ...b,
        y: b.y + (b.speed || 50) * deltaTime / 1000
    })),
    bombs: bombs.map(b => ({
        ...b,
        y: b.y + (b.speed || 50) * deltaTime / 1000,
        angle: (b.angle || 0) + (300 * deltaTime / 1000)
    })),
    sprites: {
        ...sprites,
        misc: {
            ...sprites.misc,
            crosses: sprites.misc.crosses.map(({scale = 1, y, opacity = 1, ...rest}) => ({
                ...rest,
                y: y - scale * (deltaTime / 50),
                scale: scale + deltaTime/300,
                opacity: opacity - (0.35/deltaTime)
            })),
            stars: sprites.misc.stars.map(({speed, x, y, direction, opacity = 1, ...rest}) => ({
                ...rest,
                y: y - speed * deltaTime / 1000,
                x: starMoveX(deltaTime, x, direction, speed),
                opacity: opacity - (0.35/deltaTime),
                direction,
                speed
            })),
            drops: sprites.misc.drops.map(({speed, x, y, direction, opacity = 1, ...rest}) => ({
                ...rest,
                y: y - speed * deltaTime / 1000,
                x: starMoveX(deltaTime, x, direction, speed),
                opacity: opacity - (0.35/deltaTime),
                direction,
                speed
            })),
            clouds: sprites.misc.clouds.map(c => ({
                ...c,
                x: c.x - c.w > settings.width ? -c.w : c.x + (c.speed*deltaTime/1000)
            }))
        }
    }
})
