export interface LastLeftTileType {
    x: number,
    y: number
}
export interface TargetType {
    show: boolean,
    x: number,
    y: number
};
export interface TargetPreviewType {
    show: boolean,
    x: number,
    y: number
};
export interface TargetPreviewPosType {
    shouldShow: boolean,
    x: number,
    y: number
}
export interface FieldType {
    field: string,
    x: number,
    y: number,
};
export interface HitType {
    hit: boolean,
    x: number,
    y: number,
};

interface fireMissle { type: 'fireMissle', payload: { x: number, y: number, hit: boolean } };
interface removeMissle { type: 'removeMissle', payload: { x: number, y: number, hit: boolean } };

export type HitDispatchType = fireMissle | removeMissle;
