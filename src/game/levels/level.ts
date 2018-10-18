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
        ... [
            {time: 1000, x: 100},
            {time: 3000, x: 0},
            {time: 3500, x: 50},
            {time: 4000, x: 0},
            {time: 5000, x: 100},
            {time: 5500, x: 70},
            {time: 6000, x: 100},
            {time: 6500, x: 30},
            {time: 7000, x: 80},
        ],
        ...[
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
        ], ...new Array(50).fill(0).map((_, i) => ({
            time: 6000 + i * 1000 + (Math.random() * 500),
            drop: DropTypes.Bomb,
        })) ]
}