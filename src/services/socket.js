import React from "react";
import io from "socket.io-client";

const socket = io("https://codedamn.nitigyakapoor.in");

let heartbeatInterval;
let heartbeatCount = 0;

socket.on('connect', function connectFn(data) {
    console.log('connected');
    var heartbeat = function heartbeatFn()
    {
        console.log('sending heartbeat ' + heartbeatCount);
        socket.emit('heartbeat', heartbeatCount);
        heartbeatCount += 1;
    };
    clearInterval(heartbeatInterval);
    heartbeatInterval = setInterval(heartbeat, 1000);
});

socket.on('reconnect', function disconnectFn(data) {
    console.log('reconnected');
});

socket.on('disconnect', function disconnectFn(data) {
    console.log('disconnected');
    clearInterval(heartbeatInterval);
});

const SocketContext = React.createContext(socket);

// eslint-disable-next-line import/no-anonymous-default-export
export { socket, SocketContext };
