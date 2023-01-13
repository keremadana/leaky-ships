import { modes } from "./components/useGameEvent";

export type LastLeftTileType = {
    x: number,
    y: number
}
export type TargetType = {
    show: boolean,
    x: number,
    y: number
};
export type TargetPreviewType = {
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
    target: {
        show: boolean,
        x: number,
        y: number,
    },
    params: {
        edges: string[],
        imply: boolean
    }
}
export type TargetModifierType = {
    target: {
        x: number,
        y: number,
    },
    params: {
        edges: string[],
        imply: boolean
    }
}
export type ItemsType = {
    icon: string,
    text: string,
    type?: keyof typeof modes,
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
