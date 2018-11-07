import { IGameState } from '../../../App'

export default ({ sprites, settings }: IGameState): Partial<IGameState> => ({
    sprites: {
        ...sprites,
        misc: {
            ...sprites.misc,
            crosses: sprites.misc.crosses.filter((({ y, opacity = 1 }) => y > settings.height - 250 || opacity > 0)),
            stars: sprites.misc.stars.filter((({ opacity = 1 }) => opacity > 0)),
            drops: sprites.misc.drops.filter((({ opacity = 1 }) => opacity > 0)),
        }
    }
})