import { DropTypes, IDrop, IEvent } from '../levels/level'

export function isDropEvent(event: IEvent): event is IDrop {
    return (event as IDrop).drop !== undefined;
}

export function isBombEvent({drop}: IDrop) : boolean {
    return drop === DropTypes.Bomb
}
