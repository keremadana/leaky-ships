import { faCrosshairs } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties } from 'react';
import classNames from 'classnames';
import { TargetType } from '../interfaces';
import { faRadar } from '@fortawesome/pro-thin-svg-icons';

function Target({ props: {
    preview,
    type,
    edges,
    imply,
    x,
    y,
    show
} }: {
    props: {
        preview?: boolean,
        type: string,
        edges: string[],
        imply: boolean,
    } & TargetType
}) {
    const isRadar = type === 'radar'
    const style = !isRadar ? { '--x': x, '--y': y } : { '--x1': x - 1, '--x2': x + 2, '--y1': y - 1, '--y2': y + 2 }
    return (
        <div className={classNames('hit-svg', preview ? 'target-preview' : 'target', type, { show: show }, ...edges, { edge: !isRadar || !preview }, { imply: imply })} style={style as CSSProperties}>
            <FontAwesomeIcon icon={!isRadar ? faCrosshairs : faRadar} />
        </div>
    )
}

export default Target