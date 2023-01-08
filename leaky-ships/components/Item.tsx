import React from 'react'

function Item({ props: { icon, text, cllFn } }: {
    props: {
        icon: string,
        text: string,
        cllFn: () => void,
    }
}) {
    return (
        <div className='item' onClick={cllFn}>
            <img src={`/assets/${icon}.png`} alt={`${icon}.png`} />
            <span>{text}</span>
        </div>
    )
}

export default Item