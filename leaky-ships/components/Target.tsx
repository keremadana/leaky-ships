import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties } from 'react';
import classNames from 'classnames';

function Target({ props: { preview, type, edges }, target: { x, y, show } }: { props: { preview?: boolean, type: string, edges: string[] }, target: { x: number, y: number, show: boolean } }) {
    return (
        <div className={classNames('hit-svg', preview ? 'target-preview' : 'target', type, { show: show }, ...edges)} style={{ '--x': x, '--y': y } as CSSProperties}>
            <FontAwesomeIcon icon={faCrosshairs} />
        </div>
    )
}

export default Target