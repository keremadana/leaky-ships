import { io } from 'socket.io-client'

function SocketIO() {
    const socket = io("ws://localhost:5001")
    socket.on('test2', (warst) => {
        console.log('Test2:', warst, socket.id)
    })
    socket.on("connect", () => {
        console.log(socket.connected) // true
        setTimeout(() => {
            socket.emit('test', "warst")
            socket.emit('test', "tsra")
            socket.emit('test', "1234")
            // socket.disconnect()
        }, 1000)
    })

    socket.on("test", () => {
        console.log("Got test1234") // false
    })

    socket.on("disconnect", () => {
        console.log(socket.connected) // false
    })
    return (
        <div>SocketIO</div>
    )
}

export default SocketIO