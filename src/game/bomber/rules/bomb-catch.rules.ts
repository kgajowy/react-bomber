import { IGameState } from '../../../App'
import { ISprite } from '../../util/sprite'

const bombCollides = (bomb: ISprite, bucket: ISprite) =>
    bomb.x + bomb.w / 2 >= bucket.x - bucket.w / 2 &&
    bomb.x - bomb.w / 2 <= bucket.x + bucket.w / 2 &&
    bomb.y + bomb.h / 2 >= bucket.y - bucket.h / 2 &&
    bomb.y - bomb.h / 2 <= bucket.y + bucket.h / 2

export default ({ bombs, bucket, stats }: IGameState): Partial<IGameState> => {
    const newBombs: ISprite[] = []

    for (const b of bombs) {
        if (!bombCollides(b, bucket)) {
            newBombs.push(b)
        } else {
            ++stats.bombsCaught
            stats.points += 100
        }
    }

    return {
        bombs: newBombs,
        stats: {
            ...stats,
        }
    }
}