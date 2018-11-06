import { IGameState } from '../../../App'

const
    keyframes = [
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: -2 },
        { x: -2, y: -4 },
        { x: -4, y: -2 },
        { x: -2, y: 0 },
        { x: 0, y: 0 },
    ]

let index = 0

export default ({shake}: IGameState): Partial<IGameState> => {
    if (!shake.start && index === 0) {
        return {}
    }

    index++
    let finished = false
    if (index >= keyframes.length) {
        finished = true
        index = 0
    }
    return {
        shake: {
            ...keyframes[ index ],
            start: !finished
        }
    }
}