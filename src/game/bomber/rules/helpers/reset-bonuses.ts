import { IGameState } from '../../../../App'

export const resetBonuses = () : Partial<IGameState> => ({
    factors: {
        bombSpeed: {
            createdAt: 0,
            expires: 0,
            value: 1,
        },
        score: {
            createdAt: 0,
            expires: 0,
            value: 1,
        },
    },
})