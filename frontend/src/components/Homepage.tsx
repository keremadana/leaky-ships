import { CSSProperties, useEffect, useMemo, useState } from 'react'
import '../styles/home.scss'

function Homepage() {

    const [columns, setColumns] = useState(floorClient(document.body.clientWidth))
    const [rows, setRows] = useState(floorClient(document.body.clientHeight))
    const [quantity, setQuantity] = useState(columns * rows)
    const [position, setPosition] = useState([0, 0])
    const [active, setActve] = useState(false)

    useEffect(() => {
        function handleResize() {
            setColumns(floorClient(document.body.clientWidth))
            setRows(floorClient(document.body.clientHeight))
        }
        handleResize()
        window.addEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => setQuantity(columns * rows), 500)
        return () => clearTimeout(timeout)
    }, [columns, rows])


    function floorClient(number: number) {
        return Math.floor(number / 50)
    }

    function createTile(index: number) {
        const x = index % columns
        const y = Math.floor(index / columns)
        const xDiff = (x - position[0]) / 10
        const yDiff = (y - position[1]) / 10
        const pos = (Math.sqrt(xDiff * xDiff + yDiff * yDiff)).toFixed(2)
        return (
            <div
                key={index}
                className={"tile " + (active ? 'active' : '')}
                style={{ '--delay': pos + 's' } as CSSProperties}
                onClick={() => {
                    setPosition([x, y])
                    setActve(e => !e)
                }}
            >
                {/* {pos} */}
            </div>
        )
    }

    const createTiles = useMemo(() => {
        console.log(3, columns, rows, quantity)
        // return <p>{quantity}</p>
        return (
            <div id='tiles' style={{ '--columns': columns, '--rows': rows } as CSSProperties}>
                {Array.from(Array(quantity)).map((tile, index) => createTile(index))}
            </div>
        )
    }, [quantity, position])

    return createTiles
}

export default Homepage