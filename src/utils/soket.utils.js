import io from 'socket.io-client';
import { BASE_URL } from '../config/app.config';

const socket = io(BASE_URL, {
    'reconnection': true,
    'reconnectionDelay': 500,
    'reconnectionAttempts': 3,
    'transports': ['websocket'],
});

function GetSocket() {
    return socket;
}

export {
    GetSocket
}