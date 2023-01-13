import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { hitReducer, initlialLastLeftTile, initlialTarget, initlialTargetPreview, initlialTargetPreviewPos, isHit } from '../helpers';
import { HitType, ItemsType, LastLeftTileType, TargetListType, TargetModifierType, TargetPreviewPosType, TargetPreviewType, TargetType } from '../interfaces';
import Item from './Item';
import Target from './Target';

export const modes = {
    none: { xEnable: false, yEnable: false, type: 'none' },
    radar: { xEnable: false, yEnable: false, type: 'radar' },
    hTorpedo: { xEnable: true, yEnable: false, type: 'torpedo' },
    vTorpedo: { xEnable: false, yEnable: true, type: 'torpedo' },
    missle: { xEnable: false, yEnable: false, type: 'missle' }
}

function useGameEvent(count: number) {
    const [lastLeftTile, setLastLeftTile] = useState<LastLeftTileType>(initlialLastLeftTile);
    const [target, setTarget] = useState<TargetType>(initlialTarget);
    const [eventReady, setEventReady] = useState(false);
    const [appearOK, setAppearOK] = useState(false);
    const [targetPreview, setTargetPreview] = useState<TargetPreviewType>(initlialTargetPreview);
    const [targetPreviewPos, setTargetPreviewPos] = useState<TargetPreviewPosType>(initlialTargetPreviewPos);
    const [hits, DispatchHits] = useReducer(hitReducer, [] as HitType[]);
    const [mode, setMode] = useState<keyof typeof modes>('none')
    const [targetList, setTargetList] = useState<TargetListType[]>([])
    const [targetPreviewList, setTargetPreviewList] = useState<TargetListType[]>([])

    function modXY<T>(e: TargetType, mod: TargetModifierType) {
        const { show, ...pos } = e
        const { target, params } = mod
        return {
            target: {
                show,
                x: pos.x + (target.x ?? 0),
                y: pos.y + (target.y ?? 0)
            },
            params
        }
    }

    const isSet = useCallback((x: number, y: number) => targetList.filter(({ target }) => x === target.x && y === target.y).length && target.show, [targetList, target])

    const scopeGrid = useMemo(() => {
        const { xEnable, yEnable } = modes[mode]
        const matrix: TargetModifierType[][] = []
        let y = 0
        let x = 0
        const yLength = (yEnable ? 2 : 0)
        const xLength = (xEnable ? 2 : 0)
        for (let i = 0; i <= yLength; i++) {
            for (let i2 = 0; i2 <= xLength; i2++) {
                y = i + (yEnable ? -1 : 0);
                x = i2 + (xEnable ? -1 : 0);

                (matrix[i] ??= [])[i2] = {
                    target: {
                        x,
                        y,
                    },
                    params: {
                        edges: [
                            i2 === 0 ? 'left' : '',
                            i2 === xLength ? 'right' : '',
                            i === 0 ? 'top' : '',
                            i === yLength ? 'bottom' : '',
                        ],
                        imply: false
                    }
                }
            }
        }
        const fields = matrix.reduce((prev, curr) => [...prev, ...curr], [])
        return fields
    }, [mode])

    const Targets = useCallback((targets: TargetListType[], preview?: boolean) => {
        const { type } = modes[mode]
        return targets.map(({ target, params }, i) => <Target key={i} props={{ type, preview, ...params, ...target }} />)
    }, [mode])

    useEffect(() => {
        const result = scopeGrid.map(e => modXY(target, e))
            .filter(({ target: { x, y } }) => {
                const border = [
                    x < 2,
                    x > count,
                    y < 2,
                    y > count,
                ].reduce((prev, curr) => prev || curr, false)
                return !border
            }).map(field => {
                const { target, params } = field
                const { x, y } = target
                if (isHit(hits, x, y).length)
                    return { ...field, params: { ...params, imply: true } }
                return field
            })
        setTargetList(e => {
            if (JSON.stringify(e) === JSON.stringify(result))
                return e
            return result
        })
    }, [scopeGrid, target, count, hits]);

    useEffect(() => {
        const result = scopeGrid.map(e => modXY(targetPreview, e))
            .filter(({ target: { x, y } }) => {
                const border = [
                    x < 2,
                    x > count + 1,
                    y < 2,
                    y > count + 1,
                ].reduce((prev, curr) => prev || curr, false)
                return !border
            }).map(field => {
                const { target, params } = field
                const { x, y } = target
                if (isHit(hits, x, y).length || isSet(x, y))
                    return { ...field, params: { ...params, imply: true } }
                return field
            })
        if (!targetPreviewPos.shouldShow)
            return
        setTargetPreviewList(e => {
            if (JSON.stringify(e) === JSON.stringify(result))
                return e
            return result
        })
    }, [scopeGrid, targetPreview, count, hits, isSet, targetPreviewPos.shouldShow]);

    // handle visibility and position change of targetPreview
    useEffect(() => {
        const { show, x, y } = targetPreview;
        // if mouse has moved too quickly and last event was entering and leaving the same field, it must have gone outside the grid
        const hasLeft = x === lastLeftTile.x && y === lastLeftTile.y

        if (show && !appearOK)
            setTargetPreview(e => ({ ...e, show: false }));
        if (!show && targetPreviewPos.shouldShow && eventReady && appearOK && !isHit(hits, x, y).length && !hasLeft)
            setTargetPreview(e => ({ ...e, show: true }));
    }, [targetPreview, targetPreviewPos.shouldShow, hits, eventReady, appearOK, lastLeftTile])

    // enable targetPreview event again after 200 mil. sec.
    useEffect(() => {
        const { x: newX, y: newY } = targetPreviewPos;
        setEventReady(false);
        if (targetPreview.show || !appearOK)
            return;
        const autoTimeout = setTimeout(() => {
            setTargetPreview(e => ({ ...e, x: newX, y: newY }));
            setEventReady(true);
            setAppearOK(true);
        }, 300);

        // or abort if state has changed early
        return () => {
            clearTimeout(autoTimeout);
        }
    }, [targetPreviewPos, targetPreview.show, appearOK]);

    // approve targetPreview new position after 200 mil. sec.
    useEffect(() => {
        // early return to start cooldown only when about to show up
        const autoTimeout = setTimeout(() => {
            setAppearOK(!targetPreview.show)
        }, 600);

        // or abort if movement is repeated early
        return () => {
            clearTimeout(autoTimeout);
        }
    }, [targetPreview.show]);

    const targets = useMemo(() => <>
        {Targets(targetPreviewList, true)}
        {Targets(targetList)}
    </>, [Targets, targetList, targetPreviewList])

    const eventBar = useMemo(() => {
        const items: ItemsType[] = [
            { icon: 'burger-menu', text: 'Menu' },
            { icon: 'radar', text: 'Radar scan', type: 'radar', amount: 1 },
            { icon: 'missle', text: 'Fire torpedo', type: 'hTorpedo', amount: 1 },
            { icon: 'scope', text: 'Fire missle', type: 'missle' },
            { icon: 'gear', text: 'Settings' }
        ]
        return (
            <div className='event-bar'>
                {items.map((e, i) => (
                    <Item key={i} props={{ ...e, callback: () => { setMode(e.type as any); setTarget(e => ({ ...e, show: false })) } }} />
                ))}
            </div>
        )
    }, [])
    return {
        targets,
        eventBar,
        setLastLeftTile,
        setTarget,
        setTargetPreviewPos,
        hits,
        DispatchHits
    }
}

export default useGameEvent