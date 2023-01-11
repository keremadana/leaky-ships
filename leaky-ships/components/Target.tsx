import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties } from 'react';

function Target({ preview, target: { x, y, show } }: { preview?: boolean, target: { x: number, y: number, show: boolean } }) {
    return (
        <div className={`hit-svg target${preview ? '-preview' : ''} ${show ? 'show' : ''}`} style={{ '--x': x, '--y': y } as CSSProperties}>
            <FontAwesomeIcon icon={faCrosshairs} />
        </div>
    )
}

export default Target