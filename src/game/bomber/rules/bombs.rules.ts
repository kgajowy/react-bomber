import { IGameState } from '../../../App'

export default ({ deltaTime, bombs }: IGameState): Partial<IGameState> => ({
    bombs: bombs.map(b => ({
        ...b,
        y: b.y + (b.speed || 50) * deltaTime / 1000
    }))
})