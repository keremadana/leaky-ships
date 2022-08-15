import { faBurst, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties } from 'react';
import { HitType } from '../interfaces';

function HitElems({hits}: {hits: HitType[]}) {

    return <>
        {hits.map(({hit, x, y}, i) => 
            <div key={i} className='hit-svg' style={{'--x': x, '--y': y} as CSSProperties}>
                <FontAwesomeIcon icon={hit ? faBurst : faXmark} />
            </div>
        )}
    </>
}

export default HitElems;
