const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

const host = '127.0.0.1';
const port = 7002;

const userNamespace = io.of('/users');

const adminsNamespace = io.of('/admins');

userNamespace.on('connection', (socket) => {
    const socketId = socket.id;

    console.log(`Client with id: ${socketId} was connected`);

    socket.emit('message', 'I am a server user!');

    socket.on('message', (message) => {
        console.log('Message from /users namespace', message);
    });

    socket.on('disconnect', () => {
        console.log(`Client with id ${socketId} was disconnected.`);
    });

});

adminsNamespace.on('connection', (socket) => {
    const socketId = socket.id;

    console.log('SOCKET', socket);

    console.log(`Client with id: ${socketId} was connected`);

    socket.emit('message', 'I am a server admin!');

    socket.on('message', (message) => {
        console.log('Message from /admins namespace', message);
    });

    socket.on('disconnect', () => {
        console.log(`Client with id ${socketId} was disconnected.`);
    });

});

app.use(express.static(__dirname));


app.get('/', (req, res) => res.sendFile('index.html'));

server.listen(port, host, () => {
    console.log(`Server listens http://${host}:${port}`);
});
