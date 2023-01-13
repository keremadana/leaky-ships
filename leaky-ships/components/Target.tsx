import { faCrosshairs } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties } from 'react';
import classNames from 'classnames';
import { TargetType } from '../interfaces';

function Target({ props: { preview, type, edges, imply }, target: { x, y, show } }: { props: { preview?: boolean, type: string, edges: string[], imply: boolean }, target: TargetType }) {
    return (
        <div className={classNames('hit-svg', preview ? 'target-preview' : 'target', type, { show: show }, ...edges, { imply: imply })} style={{ '--x': x, '--y': y } as CSSProperties}>
            <FontAwesomeIcon icon={faCrosshairs} />
        </div>
    )
}

export default Target