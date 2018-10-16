import { IGameState } from '../../../App'
import { ISprite } from '../../util/sprite'

const bombCollides = (bomb: ISprite, mouseX: number) =>
    bomb.x - 30 <= mouseX
    && bomb.x + 30 >= mouseX
    && bomb.y >= 370
    && bomb.y <= 400    // TODO collisions & bounding boxes!

export default ({ bombs, mouseX }: IGameState): Partial<IGameState> => {
    const newBombs: ISprite[] = []
    // const newCrosses: ISprite[] = []

    for (const b of bombs) {
        if (!bombCollides(b, mouseX)) {
            newBombs.push(b)
        }
    }

    return {
        bombs: newBombs
    }
}