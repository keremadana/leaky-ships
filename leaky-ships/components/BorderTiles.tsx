import { CSSProperties, Dispatch, SetStateAction } from 'react';
import { borderCN, cornerCN, fieldIndex, isHit } from '../helpers';
import { HitDispatchType, HitType, TargetPreviewType, TargetType } from '../interfaces';

function BorderTiles({ count, actions: { setTarget, setTargetPreview, hits, DispatchHits } }: { count: number, actions: { setTarget: Dispatch<SetStateAction<TargetType>>, setTargetPreview: Dispatch<SetStateAction<TargetPreviewType>>, hits: HitType[], DispatchHits: Dispatch<HitDispatchType> } }) {
    let tilesProperties: {
        key: number,
        isGameTile: boolean,
        classNameString: string,
        x: number,
        y: number
    }[] = [];

    for (let y = 0; y < count + 2; y++) {
        for (let x = 0; x < count + 2; x++) {
            const key = fieldIndex(count, x, y);
            const cornerReslt = cornerCN(count, x, y);
            const borderType = cornerReslt ? cornerReslt : borderCN(count, x, y);
            const isGameTile = x > 0 && x < count + 1 && y > 0 && y < count + 1;
            const classNames = ['border-tile'];
            if (borderType)
                classNames.push('edge', borderType);
            if (isGameTile)
                classNames.push('game-tile');
            const classNameString = classNames.join(' ')
            tilesProperties.push({ key, classNameString, isGameTile, x: x + 1, y: y + 1 })
        }
    }
    return <>
        {tilesProperties.map(({ key, classNameString, isGameTile, x, y }) => {
            return <div
                key={key}
                className={classNameString}
                style={{ '--x': x, '--y': y } as CSSProperties}
                onClick={() => {
                    if (!isGameTile && !isHit(hits, x, y).length)
                        return;
                    setTargetPreview(e => ({ ...e, shouldShow: false, show: false }))
                    setTarget(t => {
                        if (t.x === x && t.y === y) {
                            DispatchHits({ type: 'fireMissle', payload: { hit: (x + y) % 2 !== 0, x, y } });
                            return { show: false, x, y };
                        } else {
                            return { show: true, x, y };
                        }
                    });

                }}
                onMouseEnter={() => setTargetPreview(e => ({ ...e, newX: x, newY: y, shouldShow: isGameTile }))}
            ></div>
        })}
    </>
}

export default BorderTiles;
