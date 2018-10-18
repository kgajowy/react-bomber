import { IGameState } from '../../../App'
import { DropTypes, IDrop, IEvent } from '../../levels/level'


function isDropEvent(event: IEvent): event is IDrop {
    return (event as IDrop).drop !== undefined;
}

function isBombEvent({drop}: IDrop) : boolean {
    return drop === DropTypes.Bomb
}


export default ({ time, bombs, hands, currentLevel }: IGameState): Partial<IGameState> => {
    // TODO make a 'computed' lists to avoid filtering in each loop
    // @ts-ignore not sure why this warning is there ...
    const bombSpawnEvents : IDrop[] = currentLevel.triggers.filter(event => isDropEvent(event) && isBombEvent(event))
    if (bombSpawnEvents.length === 0) {
        return {}
    }
    const nextEvent = bombSpawnEvents[0]


    if (nextEvent.time <= time) {
        bombSpawnEvents.shift()
        return { bombs: [ ...bombs, { x: hands.x, y: hands.y } ], currentLevel: {...currentLevel, triggers: bombSpawnEvents} }
    } else {
        return { bombs: [ ...bombs ] }
    }

}