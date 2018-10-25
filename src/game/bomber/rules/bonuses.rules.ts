import { IGameState } from '../../../App'

export default ({ deltaTime, bonuses }: IGameState): Partial<IGameState> => ({
    bonuses: bonuses.map(b => ({
        ...b,
        y: b.y + (b.speed || 50) * deltaTime / 1000
    }))
})