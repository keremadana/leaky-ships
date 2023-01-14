import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { hitReducer, initlialLastLeftTile, initlialTarget, initlialTargetPreview, initlialTargetPreviewPos, isHit } from '../helpers';
import { HitType, ItemsType, LastLeftTileType, ModeType, TargetPreviewPosType, TargetType } from '../interfaces';
import Item from './Item';
import GamefieldPointer from './GamefieldPointer';

function useGameEvent(count: number) {
    const [lastLeftTile, setLastLeftTile] = useState<LastLeftTileType>(initlialLastLeftTile);
    const [target, setTarget] = useState<TargetType>(initlialTarget);
    const [eventReady, setEventReady] = useState(false);
    const [appearOK, setAppearOK] = useState(false);
    const [targetPreview, setTargetPreview] = useState<TargetType>(initlialTargetPreview);
    const [targetPreviewPos, setTargetPreviewPos] = useState<TargetPreviewPosType>(initlialTargetPreviewPos);
    const [hits, DispatchHits] = useReducer(hitReducer, [] as HitType[]);
    // const [mode, setMode] = useState<[number, string]>([0, ''])
    const [mode, setMode] = useState(0)

    const modes = useMemo<ModeType[]>(() => [
        { pointerGrid: Array.from(Array(3), () => Array.from(Array(3))), type: 'radar' },
        { pointerGrid: Array.from(Array(3), () => Array.from(Array(1))), type: 'htorpedo' },
        { pointerGrid: Array.from(Array(1), () => Array.from(Array(3))), type: 'vhtorpedo' },
        { pointerGrid: [[{ x: 0, y: 0 }]], type: 'missle' }
    ], [])

    const settingTarget = useCallback((isGameTile: boolean, x: number, y: number) => {
        if (!isGameTile || isHit(hits, x, y).length)
            return;
        setTargetPreviewPos(e => ({ ...e, shouldShow: false }))
        setTarget(t => {
            if (t.x === x && t.y === y && t.show) {
                DispatchHits({ type: 'fireMissle', payload: { hit: (x + y) % 2 !== 0, x, y } });
                return { preview: false, show: false, x, y };
            } else {
                return { preview: false, show: true, x, y };
            }
        })
    }, [])

    const targetList = useCallback((target: TargetType) => {
        const { pointerGrid, type } = modes[mode]
        const xLength = pointerGrid.length
        const yLength = pointerGrid[0].length
        const { x: targetX, y: targetY } = target
        return pointerGrid.map((arr, i) => {
            return arr.map((_, i2) => {
                const relativeX = -Math.floor(xLength / 2) + i;
                const relativeY = -Math.floor(yLength / 2) + i2;
                const x = targetX + (relativeX ?? 0)
                const y = targetY + (relativeY ?? 0)
                return {
                    x,
                    y,
                    type,
                    edges: [
                        i === 0 ? 'left' : '',
                        i === xLength - 1 ? 'right' : '',
                        i2 === 0 ? 'top' : '',
                        i2 === yLength - 1 ? 'bottom' : '',
                    ]
                }
            })
        })
            .reduce((prev, curr) => [...prev, ...curr], [])
    }, [mode, modes])

    const isSet = useCallback((x: number, y: number) => !!targetList(target).filter(field => x === field.x && y === field.y).length && target.show, [target, targetList])

    const composeTargetTiles = useCallback((target: TargetType) => {
        const { preview, show } = target
        const result = targetList(target).map(({ x, y, type, edges }) => {
            return {
                preview,
                x,
                y,
                show,
                type,
                edges,
                imply: !!isHit(hits, x, y).length || (!!isSet(x, y) && preview),
                // isborder: x < 2 || x > count + 1 || y < 2 || y > count + 1
            }
        })
        // .filter(({ isborder }) => !isborder)
        return result
    }, [count, hits, isSet, targetList])

    // if (!targetPreviewPos.shouldShow)
    //     return

    // handle visibility and position change of targetPreview
    useEffect(() => {
        const { show, x, y } = targetPreview;
        // if mouse has moved too quickly and last event was entering and leaving the same field, it must have gone outside the grid
        const hasLeft = x === lastLeftTile.x && y === lastLeftTile.y
        const isSet = x === target.x && y === target.y && target.show

        if (show && !appearOK)
            setTargetPreview(e => ({ ...e, show: false }));
        if (!show && targetPreviewPos.shouldShow && eventReady && appearOK && !isHit(hits, x, y).length && !isSet && !hasLeft)
            setTargetPreview(e => ({ ...e, show: true }));
    }, [targetPreview, targetPreviewPos.shouldShow, hits, eventReady, appearOK, lastLeftTile, target])

    // enable targetPreview event again after 200 mil. sec.
    useEffect(() => {
        setEventReady(false);
        if (targetPreview.show || !appearOK)
            return;
        const autoTimeout = setTimeout(() => {
            setTargetPreview(e => ({ ...e, x: targetPreviewPos.x, y: targetPreviewPos.y }));
            setEventReady(true);
            setAppearOK(true);
        }, 300);

        // or abort if state has changed early
        return () => {
            clearTimeout(autoTimeout);
        }
    }, [appearOK, targetPreview.show, targetPreviewPos.x, targetPreviewPos.y]);

    // approve targetPreview new position after 200 mil. sec.
    useEffect(() => {
        // early return to start cooldown only when about to show up
        const autoTimeout = setTimeout(() => {
            setAppearOK(!targetPreview.show)
        }, targetPreview.show ? 500 : 300);

        // or abort if movement is repeated early
        return () => {
            clearTimeout(autoTimeout);
        }
    }, [targetPreview.show]);

    const targets = useMemo(() => [
        ...composeTargetTiles(target).map((props, i) => <GamefieldPointer key={'t' + i} props={props} />),
        ...composeTargetTiles(targetPreview).map((props, i) => <GamefieldPointer key={'p' + i} props={props} />)
    ], [composeTargetTiles, target, targetPreview])

    const eventBar = useMemo(() => {
        const items: ItemsType[] = [
            { icon: 'burger-menu', text: 'Menu' },
            { icon: 'radar', text: 'Radar scan', mode: 0, amount: 1 },
            { icon: 'missle', text: 'Fire torpedo', mode: 1, amount: 1 },
            { icon: 'scope', text: 'Fire missle', mode: 2 },
            { icon: 'gear', text: 'Settings' }
        ]
        return (
            <div className='event-bar'>
                {items.map((e, i) => (
                    <Item key={i} props={{ ...e, callback: () => { e.mode !== undefined ? setMode(e.mode) : {}; setTarget(e => ({ ...e, show: false })) } }} />
                ))}
            </div>
        )
    }, [])
    return {
        targets,
        eventBar,
        setLastLeftTile,
        settingTarget,
        setTargetPreviewPos,
        hits
    }
}

export default useGameEvent