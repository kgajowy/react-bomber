export enum DropTypes {
    Bomb
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

}

export type EventTypes = IDrop | IMove

export interface ILevel {
    name: string,
    triggers: EventTypes[],
}

export const sampleLevel: ILevel = {
    name: 'Level 1',
    triggers: [
        {
            time: 1000,
            drop: DropTypes.Bomb,
        },
        {
            time: 1500,
            drop: DropTypes.Bomb,
        },
        {
            time: 2000,
            drop: DropTypes.Bomb,
        },
        {
            time: 2600,
            drop: DropTypes.Bomb,
        },
        {
            time: 2700,
            drop: DropTypes.Bomb,
        },
        {
            time: 4000,
            drop: DropTypes.Bomb,
        },
        {
            time: 5000,
            drop: DropTypes.Bomb,
        },
    ]
}