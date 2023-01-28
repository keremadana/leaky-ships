import classNames from 'classnames'
import { CSSProperties } from 'react'
import { fieldIndex } from '../utils/helpers'
import { Field } from '../interfaces/frontend'

function Labeling({count}: {count: number}) {
    let elems: (Field & {
        orientation: string
    })[] = []
    for (let x = 0; x < count; x++) {
        elems.push(
            // Up
            {field: String.fromCharCode(65+x), x: x+2, y: 1, orientation: 'up'},
            // Left
            {field: (x+1).toString(), x: 1, y: x+2, orientation: 'left'},
            // Bottom
            {field: String.fromCharCode(65+x), x: x+2, y: count+2, orientation: 'bottom'},
            // Right
            {field: (x+1).toString(), x: count+2, y: x+2, orientation: 'right'}
        )
    }
    elems = elems.sort((a, b) => fieldIndex(count, a.x, a.y)-fieldIndex(count, b.x, b.y))
    return <>
        {elems.map(({field, x, y, orientation}, i) =>
            <span key={i} className={classNames('label', orientation, field)} style={{'--x': x, '--y': y} as CSSProperties}>{field}</span>
        )}
    </>
}

export default Labeling
