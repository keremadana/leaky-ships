import classNames from 'classnames'
import React, { CSSProperties } from 'react'

function Item({ props: { icon, text, amount, callback } }: {
    props: {
        icon: string,
        text: string,
        amount?: number,
        callback: () => void
    }
}) {
    return (
        <div className='item' onClick={callback}>
            <div className={classNames('container', { amount: amount })} style={amount ? { '--amount': JSON.stringify(amount.toString()) } as CSSProperties : {}}>
                <img src={`/assets/${icon}.png`} alt={`${icon}.png`} />
            </div>
            <span>{text}</span>
        </div>
    )
}

export default Item