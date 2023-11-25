import io from 'socket.io-client';
const socket = io();
export function setserv(serverurl){
   socket.io.uri = serverurl;

}

export default socket;

