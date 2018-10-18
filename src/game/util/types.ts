import { DropTypes, IDrop, IEvent, IMove } from '../levels/level'

export function isDropEvent(event: IEvent): event is IDrop {
    return (event as IDrop).drop !== undefined;
}

export function isMoveEvent(event: IEvent): event is IMove {
    return (event as IMove).x !== undefined;
}

export function isBombEvent({drop}: IDrop) : boolean {
    return drop === DropTypes.Bomb
}
