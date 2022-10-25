import { io } from 'socket.io-client';

function SocketIO() {
    // const socket = io("wss://server-domain.com");
    const socket = io(); // The server URL will be deduced from the window.location object.
    return (
        <div>SocketIO</div>
    )
}

export default SocketIO