import { HitType, HitDispatchType } from "./interfaces";

export const borderCN = (count: number, x: number, y: number) => {
    if (x === 0)
        return 'left';
    if (y === 0)
        return 'top';
    if (x === count+1)
        return 'right';
    if (y === count+1)
        return 'bottom';
    return '';
};
export const cornerCN = (count: number, x: number, y: number) => {
    if (x === 0 && y === 0)
        return 'left-top-corner';
    if (x === count+1 && y === 0)
        return 'right-top-corner';
    if (x === 0 && y === count+1)
        return 'left-bottom-corner';
    if (x === count+1 && y === count+1)
        return 'right-bottom-corner';        
    return '';
};
export const fieldIndex = (count: number, x: number, y: number) => y*(count+2)+x;
export const hitReducer = (formObject: HitType[], action: HitDispatchType) => {
    switch (action.type) {
  
      case 'fireMissle': {
        const result = [...formObject, action.payload];
        return result;
      }
  
      default:
        return formObject;
    }
}
export const initlialLastLeftTile = {
    x: 0,
    y: 0
};
export const initlialTarget = {
    preview: false,
    show: false,
    x: 2,
    y: 2
};
export const initlialTargetPreview = {
    preview: true,
    show: false,
    x: 2,
    y: 2
};
export const initlialTargetPreviewPos = {
    shouldShow: false,
    x: 0,
    y: 0
};
export const isHit = (hits: HitType[], x: number, y: number) => hits.filter(h => h.x === x && h.y === y);
