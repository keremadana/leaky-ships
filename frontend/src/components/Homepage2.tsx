import { CSSProperties, useEffect, useMemo, useState } from 'react'
import '../styles/home2.scss'

function Homepage2() {

    const floorClient = (number: number) => Math.floor(number / 50)

    const [columns, setColumns] = useState(floorClient(document.body.clientWidth))
    const [rows, setRows] = useState(floorClient(document.body.clientHeight))
    const [params, setParams] = useState({ columns, rows, quantity: columns * rows })
    const [position, setPosition] = useState([0, 0])
    const [active, setActve] = useState(false)
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

        const colors = [
            'rgb(229, 57, 53)',
            'rgb(253, 216, 53)',
            'rgb(244, 81, 30)',
            'rgb(76, 175, 80)',
            'rgb(33, 150, 243)',
            'rgb(156, 39, 176)'
        ]

        function createTile(index: number) {

            const x = index % params.columns
            const y = Math.floor(index / params.columns)
            const xDiff = (x - position[0]) / 20
            const yDiff = (y - position[1]) / 20
            const pos = (Math.sqrt(xDiff * xDiff + yDiff * yDiff)).toFixed(2)

            const doEffect = (posX: number, posY: number) => {
                if (active)
                    return
                setPosition([posX, posY])
                setActve(true)

                const xDiff = (x: number) => (x - posX) / 20
                const yDiff = (y: number) => (y - posY) / 20
                const pos = (x: number, y: number) => Math.sqrt(xDiff(x) * xDiff(x) + yDiff(y) * yDiff(y))
                const warst = [pos(0, 0), pos(params.columns, 0), pos(0, params.rows), pos(params.columns, params.rows)]
                // console.log(warst, params)

                setTimeout(() => {
                    setActve(false)
                    setCount(e => e + 1)
                }, Math.max(...warst) * 1000 + 1000)
            }

            return (
                <div
                    key={index}
                    className={'tile ' + (active ? 'active' : '')}
                    style={{ '--delay': pos + 's' } as CSSProperties}
                    onClick={() => doEffect(x, y)}
                ></div>
            )
        }

        return (
            <div id='tiles' style={{ '--columns': params.columns, '--rows': params.rows, '--bg-color1': colors[count % (colors.length - 1)], '--bg-color2': colors[(count + 1) % (colors.length - 1)] } as CSSProperties}>
                {Array.from(Array(params.quantity)).map((_tile, index) => createTile(index))}
            </div>
        )
    }, [params, position, active, count])

    return createTiles
}

export default Homepage2