import React from 'react'

function Item({ props: { icon, text, callback } }: {
    props: {
        icon: string,
        text: string,
        callback: () => void
    }
}) {
    return (
        <div className='item' onClick={callback}>
            <img src={`/assets/${icon}.png`} alt={`${icon}.png`} />
            <span>{text}</span>
        </div>
    )
}

export default Item