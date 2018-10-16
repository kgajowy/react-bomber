import { IGameState } from '../../../App'

export default ({ deltaTime, bombs }: IGameState): Partial<IGameState> => ({
    bombs: bombs.map(b => ({
        ...b,
        y: b.y + deltaTime / 10
    }))
})