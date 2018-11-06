import { IGameState } from '../../../App'

export default ({ deltaTime, crosses, settings, bonuses, bombs }: IGameState): Partial<IGameState> => ({
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
    }))
})