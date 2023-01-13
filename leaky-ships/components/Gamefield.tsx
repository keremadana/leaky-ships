import { CSSProperties } from 'react';
// import Bluetooth from './Bluetooth';
import BorderTiles from './BorderTiles';
// import FogImages from './FogImages';
import HitElems from './HitElems';
import Labeling from './Labeling';
import Ships from './Ships';
import useGameEvent from './useGameEvent';

function Gamefield() {

    const count = 12;
    const {
        targets,
        eventBar,
        setLastLeftTile,
        setTarget,
        setTargetPreviewPos,
        hits,
        DispatchHits
    } = useGameEvent(count);

    return (
        <div id='gamefield'>
            {/* <Bluetooth /> */}
            <div id="game-frame" style={{ '--i': count } as CSSProperties}>
                {/* Bordes */}
                <BorderTiles props={{ count, setTarget, setTargetPreviewPos, hits, DispatchHits, setLastLeftTile }} />

                {/* Collumn lettes and row numbers */}
                <Labeling count={count} />

                {/* Ships */}
                <Ships />

                <HitElems hits={hits} />

                {/* Fog images */}
                {/* <FogImages /> */}
                {targets}
            </div>
            {eventBar}
        </div>
    )
}

export default Gamefield