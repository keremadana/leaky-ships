import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties, useEffect, useReducer, useState } from 'react';
// import Bluetooth from './Bluetooth';
import BorderTiles from './BorderTiles';
// import FogImages from './FogImages';
import HitElems from './HitElems';
import Labeling from './Labeling';
import Ships from './Ships';
import { hitReducer, initlialTarget, initlialTargetPreview, isHit } from '../helpers';
import { HitType, TargetPreviewType, TargetType } from '../interfaces';
import Item from './Item';

function Gamefield() {

    const items = [
        { icon: 'burger-menu', text: 'Menu', cllFn: () => { } },
        { icon: 'radar', text: 'Radar scan', cllFn: () => { } },
        { icon: 'missle', text: 'Fire torpedo', cllFn: () => { } },
        { icon: 'scope', text: 'Fire missle', cllFn: () => { } },
        { icon: 'gear', text: 'Settings', cllFn: () => { } }
    ]

    const count = 12;
    const [target, setTarget] = useState<TargetType>(initlialTarget);
    const [targetPreview, setTargetPreview] = useState<TargetPreviewType>(initlialTargetPreview);
    const [hits, DispatchHits] = useReducer(hitReducer, [] as HitType[]);

    // handle visibility and position change of targetPreview
    useEffect(() => {
        const { newX, newY, shouldShow, appearOK, eventReady, show, x, y } = targetPreview;
        const positionChange = !(x === newX && y === newY);
        const alreadyTargeting = target.show && target.x === targetPreview.newX && target.y === targetPreview.newY
        // if not ready or no new position
        if (!eventReady || (!positionChange && show))
            return;
        if (show) {
            // hide preview to change position when hidden
            setTargetPreview(e => ({ ...e, appearOK: false, eventReady: false, show: false }));
        } else if (shouldShow && appearOK && !isHit(hits, newX, newY).length && !alreadyTargeting) {
            // BUT only appear again if it's supposed to (in case the mouse left over the edge) and ()
            setTargetPreview(e => ({ ...e, appearOK: false, eventReady: false, show: true, x: newX, y: newY }));
        }
    }, [targetPreview, hits])

    // enable targetPreview event again after 200 mil. sec.
    useEffect(() => {
        if (targetPreview.eventReady)
            return;
        const autoTimeout = setTimeout(() => {
            setTargetPreview(e => ({ ...e, eventReady: true }));
        }, 200);

        // or abort if state has changed early
        return () => {
            clearTimeout(autoTimeout);
        }
    }, [targetPreview.eventReady]);

    // approve targetPreview new position after 200 mil. sec.
    useEffect(() => {
        // early return to start cooldown only when about to show up
        if (!targetPreview.shouldShow)
            return;
        const autoTimeout = setTimeout(() => {
            setTargetPreview(e => ({ ...e, appearOK: true }));
        }, 350);

        // or abort if movement is repeated early
        return () => {
            clearTimeout(autoTimeout);
        }
    }, [targetPreview.shouldShow, targetPreview.newX, targetPreview.newY]);

    return (
        <div id='gamefield'>
            {/* <Bluetooth /> */}
            <div id="game-frame" style={{ '--i': count } as CSSProperties}>
                {/* Bordes */}
                <BorderTiles count={count} actions={{ setTarget, setTargetPreview, hits, DispatchHits }} />

                {/* Collumn lettes and row numbers */}
                <Labeling count={count} />

                {/* Ships */}
                <Ships />

                <HitElems hits={hits} />

                {/* Fog images */}
                {/* <FogImages /> */}
                <div className={`hit-svg target ${target.show ? 'show' : ''}`} style={{ '--x': target.x, '--y': target.y } as CSSProperties}>
                    <FontAwesomeIcon icon={faCrosshairs} />
                </div>
                <div className={`hit-svg target-preview ${targetPreview.show ? 'show' : ''}`} style={{ '--x': targetPreview.x, '--y': targetPreview.y } as CSSProperties}>
                    <FontAwesomeIcon icon={faCrosshairs} />
                </div>
            </div>
            <div className='event-bar'>
                {items.map(e => (
                    <Item props={e} />
                ))}
            </div>
        </div>
    )
}

export default Gamefield