import { CSSProperties, Dispatch, SetStateAction } from 'react';
import { borderCN, cornerCN, fieldIndex } from '../helpers';
import { LastLeftTileType, TargetPreviewPosType } from '../interfaces';

type TilesType = {
    key: number,
    isGameTile: boolean,
    classNameString: string,
    x: number,
    y: number
}

function BorderTiles({ props: { count, settingTarget, setTargetPreviewPos, setLastLeftTile } }: {
    props: {
        count: number,
        settingTarget: (isGameTile: boolean, x: number, y: number) => void,
        setTargetPreviewPos: Dispatch<SetStateAction<TargetPreviewPosType>>,
        setLastLeftTile: Dispatch<SetStateAction<LastLeftTileType>>
    }
}) {
    let tilesProperties: TilesType[] = [];

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
                onClick={() => settingTarget(isGameTile, x, y)}
                onMouseEnter={() => setTargetPreviewPos({ x, y, shouldShow: isGameTile })}
                onMouseLeave={() => setLastLeftTile({ x, y })}
            ></div>
        })}
    </>
}

export default BorderTiles;
