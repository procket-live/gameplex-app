import io from 'socket.io-client';
import { BASE_URL } from '../config/app.config';

const socket = io(BASE_URL);

function GetSocket() {
    return socket;
}

export {
    GetSocket
}