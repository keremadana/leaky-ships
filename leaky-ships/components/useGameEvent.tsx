import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { hitReducer, initlialLastLeftTile, initlialTarget, initlialTargetPreview, initlialTargetPreviewPos, isHit } from '../helpers';
import { HitType, LastLeftTileType, TargetPreviewPosType, TargetPreviewType, TargetType } from '../interfaces';
import Item from './Item';
import Target from './Target';

function useGameEvent(count: number) {
    const [lastLeftTile, setLastLeftTile] = useState<LastLeftTileType>(initlialLastLeftTile);
    const [target, setTarget] = useState<TargetType>(initlialTarget);
    const [eventReady, setEventReady] = useState(false);
    const [appearOK, setAppearOK] = useState(false);
    const [targetPreview, setTargetPreview] = useState<TargetPreviewType>(initlialTargetPreview);
    const [targetPreviewPos, setTargetPreviewPos] = useState<TargetPreviewPosType>(initlialTargetPreviewPos);
    const [hits, DispatchHits] = useReducer(hitReducer, [] as HitType[]);
    const [mode, setMode] = useState<keyof typeof modes>('none')
    const [targetList, setTargetList] = useState<{
        show: boolean;
        x: number;
        y: number;
        edges: string[];
    }[]>([])
    const [targetPreviewList, setTargetPreviewList] = useState<{
        show: boolean;
        x: number;
        y: number;
        edges: string[];
    }[]>([])

    const modes = useMemo(() => ({
        none: { xEnable: true, yEnable: true, type: 'none' },
        radar: { xEnable: true, yEnable: true, type: 'radar' },
        hTorpedo: { xEnable: true, yEnable: false, type: 'torpedo' },
        vTorpedo: { xEnable: false, yEnable: true, type: 'torpedo' },
        missle: { xEnable: false, yEnable: false, type: 'missle' }
    }), [])

    function modXY<T>(e: { show: boolean, x: number, y: number }, mod: { x: number, y: number, edges: string[] }) {
        return { show: e.show, x: e.x + (mod.x ?? 0), y: e.y + (mod.y ?? 0), edges: mod.edges }
    }

    const isSet = useCallback((x: number, y: number) => targetList.filter(target => x === target.x && y === target.y).length && target.show, [targetList, target])

    const scopeGrid = useMemo(() => {
        const { xEnable, yEnable, type } = modes[mode]
        const matrix: { x: number, y: number, edges: string[] }[][] = []
        let y = 0
        let x = 0
        const yLength = (yEnable ? 2 : 0)
        const xLength = (xEnable ? 2 : 0)
        for (let i = 0; i <= yLength; i++) {
            for (let i2 = 0; i2 <= xLength; i2++) {
                y = i + (yEnable ? -1 : 0);
                x = i2 + (xEnable ? -1 : 0);

                (matrix[i] ??= [])[i2] = {
                    x,
                    y,
                    edges: [
                        i2 === 0 ? 'left' : '',
                        i2 === xLength ? 'right' : '',
                        i === 0 ? 'top' : '',
                        i === yLength ? 'bottom' : '',
                    ]
                }
            }
        }
        const fields = matrix.reduce((prev, curr) => [...prev, ...curr], [])
        return { fields, type }
    }, [modes, mode])

    const Targets = useCallback((targets: { show: boolean, x: number, y: number, edges: string[] }[], preview?: boolean) => {
        const { type } = scopeGrid
        return targets.map(({ edges, ...target }, i) => <Target key={i} props={{ type, preview, edges }} target={target} />)
    }, [scopeGrid])

    useEffect(() => {
        const { fields } = scopeGrid
        const result = fields.map(e => modXY(target, e))
            .filter(({ x, y }) => {
                const border = [
                    x < 2,
                    x > count,
                    y < 2,
                    y > count,
                ].reduce((prev, curr) => prev || curr, false)
                // console.log(!isHit(hits, x, y).length, !borders)
                return !border
            }).map(field => {
                const { x, y } = field
                if (isHit(hits, x, y).length)
                    return { ...field, edges: [...field.edges, 'imply'] }
                return field
            })
        setTargetList(e => {
            if (JSON.stringify(e) === JSON.stringify(result))
                return e
            return result
        })
    }, [scopeGrid, target, count, hits]);

    useEffect(() => {
        const { fields } = scopeGrid
        const result = fields.map(e => modXY(targetPreview, e))
            .filter(({ x, y }) => {
                const border = [
                    x < 2,
                    x > count + 1,
                    y < 2,
                    y > count + 1,
                ].reduce((prev, curr) => prev || curr, false)
                // console.log(!isHit(hits, x, y).length, !isSet(x, y), !borders)
                return !border
            }).map(field => {
                const { x, y } = field
                if (isHit(hits, x, y).length || isSet(x, y))
                    return { ...field, edges: [...field.edges, 'imply'] }
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
        }, 500);

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
        const items = [
            { icon: 'burger-menu', text: 'Menu' },
            { icon: 'radar', text: 'Radar scan', type: 'radar' },
            { icon: 'missle', text: 'Fire torpedo', type: 'hTorpedo' },
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