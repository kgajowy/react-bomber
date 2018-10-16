import { IGameState } from '../../../App'

const SPAWN_TIME = 1000 // TODO put to game state/props ?
let lastSpawnTime = 0

export default ({ time, bombs, hands }: IGameState): Partial<IGameState> => {
    if (lastSpawnTime + SPAWN_TIME < time) {
        // spawn bomb
        lastSpawnTime = time

        return { bombs: [ ...bombs, { x: hands.x, y: hands.y } ] }
    } else {
        return { bombs: [ ...bombs ] }
    }

}