import classNames from 'classnames'
import { CSSProperties, useEffect, useMemo, useState } from 'react'

function Grid2() {

    function floorClient(number: number) {
        return Math.floor(number / 50)
    }

    const [columns, setColumns] = useState(0)
    const [rows, setRows] = useState(0)
    const [params, setParams] = useState({ columns, rows, quantity: columns * rows })
    const [position, setPosition] = useState([0, 0])
    const [active, setActve] = useState(false)
    const [action, setAction] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        function handleResize() {
            setColumns(floorClient(document.body.clientWidth))
            setRows(floorClient(document.body.clientHeight))
        }
        handleResize()
        window.addEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setParams({ columns, rows, quantity: columns * rows })
        }, 500)
        return () => clearTimeout(timeout)
    }, [columns, rows])

    const createTiles = useMemo(() => {

        const sentences = [
            'Ethem ...',
            'hat ...',
            'lange ...',
            'Hörner 🐂',
            'Grüße von Mallorca 🌊 🦦 ☀️'
        ]

        function createTile(index: number) {

            const x = index % params.columns
            const y = Math.floor(index / params.columns)
            const xDiff = (x - position[0]) / 20
            const yDiff = (y - position[1]) / 20
            const pos = (Math.sqrt(xDiff * xDiff + yDiff * yDiff)).toFixed(2)

            function doEffect(posX: number, posY: number) {
                if (action)
                    return
                setPosition([posX, posY])
                setActve(e => !e)
                setAction(true)

                function xDiff(x: number) {
                    return (x - posX) / 20
                }
                function yDiff(y: number) {
                    return (y - posY) / 20
                }
                function pos(x: number, y: number) {
                    return Math.sqrt(xDiff(x) * xDiff(x) + yDiff(y) * yDiff(y))
                }
                const diagonals = [pos(0, 0), pos(params.columns, 0), pos(0, params.rows), pos(params.columns, params.rows)]

                setTimeout(() => {
                    setAction(false)
                    if (active)
                        setCount(e => e + 1)
                }, Math.max(...diagonals) * 1000 + 1000)
            }

            return (
                <div
                    key={index}
                    className={classNames('tile', (active ? 'active' : 'inactive'))}
                    style={{ '--delay': pos + 's' } as CSSProperties}
                    onClick={() => doEffect(x, y)}
                ></div>
            )
        }

        return (
            <div id='tiles' style={{ '--columns': params.columns, '--rows': params.rows } as CSSProperties}>
                <div className="center-div">
                    <h1 className={classNames('headline', (!active ? 'active' : 'inactive'))}>{sentences[count % sentences.length]}</h1>
                </div>
                {Array.from(Array(params.quantity), (_tile, index) => createTile(index))}
            </div >
        )
    }, [params, position, active, action, count])

    return createTiles
}

export default Grid2