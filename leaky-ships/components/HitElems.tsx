import { faBurst, faXmark } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSProperties } from 'react'
import { Hit } from '../interfaces'

function HitElems({hits}: {hits: Hit[]}) {

    return <>
        {hits.map(({hit, x, y}, i) => 
            <div key={i} className='hit-svg' style={{'--x': x, '--y': y} as CSSProperties}>
                <FontAwesomeIcon icon={hit ? faBurst : faXmark} />
            </div>
        )}
    </>
}

export default HitElems
