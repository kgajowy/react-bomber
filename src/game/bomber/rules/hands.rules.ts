import { IGameState } from '../../../App'

export default ({ time, hands }: IGameState): Partial<IGameState> => ({
    hands: {
        ...hands,
        x: Math.sin(time / 1000) * 300 + 355
    }
})