export enum DropTypes {
    Bomb,
    BonusDoubleScore,
}

export interface IEvent {
    /**
     * @time - when x should be reached
     */
    time: number,
}

export interface IMove extends IEvent {
    /**
     * @x - 0-100
     */
    x: number,
}

export interface IDrop extends IEvent {
    /**
     * @drop - what to drop (bomb, bonus)
     */
    drop: DropTypes,

    /**
     * @speed - pixels per second
     */
    speed: number,

}

export type EventTypes = IDrop | IMove

export interface ILevel {
    name: string,
    triggers: EventTypes[],
}