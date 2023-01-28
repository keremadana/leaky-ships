export interface Position {
    x: number,
    y: number
}
export interface Target extends Position {
    preview: boolean,
    show: boolean
}
export interface MouseCursor extends Position {
    shouldShow: boolean
}
export interface TargetList extends Position {
    type: string,
    edges: string[]
}
export interface Mode {
    pointerGrid: any[][],
    type: string
}
export interface Items {
    icon: string,
    text: string,
    mode?: number,
    amount?: number,
}
export interface Field extends Position {
    field: string
}
export interface Hit extends Position {
    hit: boolean
}

interface fireMissile {
    type: 'fireMissile',
    payload: {
        x: number,
        y: number,
        hit: boolean
    }
}
interface removeMissile {
    type: 'removeMissile',
    payload: {
        x: number,
        y: number,
        hit: boolean
    }
}

export type HitDispatch = fireMissile | removeMissile
