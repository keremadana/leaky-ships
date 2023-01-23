import { faCrosshairs } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSProperties } from 'react'
import classNames from 'classnames'
import { faRadar } from '@fortawesome/pro-thin-svg-icons'

function GamefieldPointer({ props: {
    preview,
    x,
    y,
    show,
    type,
    edges,
    imply
} }: {
    props: {
        preview: boolean,
        x: number,
        y: number,
        show: boolean,
        type: string,
        edges: string[],
        imply: boolean,
    }
}) {
    const isRadar = type === 'radar'
    const style = !(isRadar && !edges.filter(s => s).length) ? { '--x': x, '--y': y } : { '--x1': x - 1, '--x2': x + 2, '--y1': y - 1, '--y2': y + 2 }
    return (
        <div className={classNames('hit-svg', { preview: preview }, 'target', type, { show: show }, ...edges, { imply: imply })} style={style as CSSProperties}>
            <FontAwesomeIcon icon={!isRadar ? faCrosshairs : faRadar} />
        </div>
    )
}

export default GamefieldPointer