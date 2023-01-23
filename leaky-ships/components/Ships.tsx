import classNames from 'classnames'
import { CSSProperties } from 'react'

function Ships() {
    let shipIndexes = [
        { size: 2, index: null },
        { size: 3, index: 1 },
        { size: 3, index: 2 },
        { size: 3, index: 3 },
        { size: 4, index: 1 },
        { size: 4, index: 2 }
    ]

    return <>
        {shipIndexes.map(({ size, index }, i) => {
            const filename = `/assets/ship_blue_${size}x${index ? '_' + index : ''}.gif`
            return (
                <div key={i} className={classNames('ship', 's' + size)} style={{ '--x': i + 3 } as CSSProperties}>
                    <img src={filename} alt={filename} />
                </div>
            )
        })}
    </>
}

export default Ships
