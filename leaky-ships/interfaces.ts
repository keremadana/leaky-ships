export type LastLeftTileType = {
    x: number,
    y: number
}
export type TargetType = {
    preview: boolean,
    show: boolean,
    x: number,
    y: number
};
export type TargetPreviewPosType = {
    shouldShow: boolean,
    x: number,
    y: number
}
export type TargetListType = {
    x: number,
    y: number,
    type: string,
    edges: string[]
}
export type ModeType = {
    pointerGrid: any[][],
    type: string
}
export type ItemsType = {
    icon: string,
    text: string,
    mode?: number,
    amount?: number,
}
export type FieldType = {
    field: string,
    x: number,
    y: number,
};
export type HitType = {
    hit: boolean,
    x: number,
    y: number,
};

type fireMissle = {
    type: 'fireMissle',
    payload: {
        x: number,
        y: number,
        hit: boolean
    }
};
type removeMissle = {
    type:
    'removeMissle',
    payload: {
        x: number,
        y: number,
        hit: boolean
    }
};

export type HitDispatchType = fireMissle | removeMissle;
