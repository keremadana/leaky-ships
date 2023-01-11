import { useEffect, useMemo, useReducer, useState } from 'react';
import { hitReducer, initlialLastLeftTile, initlialTarget, initlialTargetPreview, initlialTargetPreviewPos, isHit } from '../helpers';
import { HitType, LastLeftTileType, TargetPreviewPosType, TargetPreviewType, TargetType } from '../interfaces';
import Item from './Item';
import Target from './Target';

function useGameEvent() {
    const [lastLeftTile, setLastLeftTile] = useState<LastLeftTileType>(initlialLastLeftTile);
    const [target, setTarget] = useState<TargetType>(initlialTarget);
    const [eventReady, setEventReady] = useState(false);
    const [appearOK, setAppearOK] = useState(false);
    const [targetPreview, setTargetPreview] = useState<TargetPreviewType>(initlialTargetPreview);
    const [targetPreviewPos, setTargetPreviewPos] = useState<TargetPreviewPosType>(initlialTargetPreviewPos);
    const [hits, DispatchHits] = useReducer(hitReducer, [] as HitType[]);

    // handle visibility and position change of targetPreview
    useEffect(() => {
        const { show, x, y } = targetPreview;
        const { shouldShow } = targetPreviewPos;
        // if mouse has moved too quickly and last event was entering and leaving the same field, it must have gone outside the grid
        const hasLeft = x === lastLeftTile.x && y === lastLeftTile.y
        const isSet = x === target.x && y === target.y

        if (show && !appearOK)
            setTargetPreview(e => ({ ...e, show: false }));
        if (!show && shouldShow && eventReady && appearOK && !isHit(hits, x, y).length && !hasLeft && !isSet)
            setTargetPreview(e => ({ ...e, show: true }));
    }, [targetPreview, hits, eventReady, appearOK, lastLeftTile])

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
        }, 250);

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

    const items = [
        { icon: 'burger-menu', text: 'Menu', cllFn: () => { } },
        { icon: 'radar', text: 'Radar scan', cllFn: () => { } },
        { icon: 'missle', text: 'Fire torpedo', cllFn: () => { } },
        { icon: 'scope', text: 'Fire missle', cllFn: () => { } },
        { icon: 'gear', text: 'Settings', cllFn: () => { } }
    ]

    const targets = useMemo(() =>
        <>
            <Target target={target} />
            <Target preview={true} target={targetPreview} />
        </>, [target, targetPreview])

    const eventBar = useMemo(() =>
        <div className='event-bar'>
            {items.map((e, i) => (
                <Item key={i} props={e} />
            ))}
        </div>, [items])

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