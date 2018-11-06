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

export default ({ deltaTime, crosses, settings, bonuses, bombs, stars }: IGameState): Partial<IGameState> => ({
    crosses: crosses.map(({scale = 1, y, opacity = 1, ...rest}) => ({
        ...rest,
        y: y - scale * (deltaTime / 50),
        scale: scale + deltaTime/300,
        opacity: opacity - (0.35/deltaTime),
    })).filter((c => c.y > settings.height - 250)),
    bonuses: bonuses.map(b => ({
        ...b,
        y: b.y + (b.speed || 50) * deltaTime / 1000
    })),
    bombs: bombs.map(b => ({
        ...b,
        y: b.y + (b.speed || 50) * deltaTime / 1000
    })),
    stars: stars.map(({speed = 50, x, y, direction, opacity = 1, ...rest}) => ({
        ...rest,
        y: y - speed * deltaTime / 1000,
        x: starMoveX(deltaTime, x, direction, speed),
        opacity: opacity - (0.35/deltaTime),
        direction,
    }))
})