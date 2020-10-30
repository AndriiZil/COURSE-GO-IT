const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

const host = '127.0.0.1';
const port = 7000;

const clients = [];

io.on('connection', (socket) => {
    const socketId = socket.id;

    console.log(`Client with id: ${socketId} was connected`);
    clients.push(socketId);

    socket.emit('message', 'I am a server!');

    socket.on('message', (message) => {
        console.log('Message from Fronend', message);
    });


    socket.on('disconnect', () => {
        clients.splice(clients.indexOf(socketId), 1);
        console.log(`Client with id ${socketId} was disconnected.`);
    });

});

app.use(express.static(__dirname));


app.get('/', (req, res) => res.sendFile('index.html'));


app.get('/clients', (req, res) => {
     res.json({
         clients: io.clients().server.engine.clientsCount
     });
});

app.post('/client/:id', (req, res) => {
    // console.log(clients);

    const userId = req.params.id;
    if (clients.indexOf(userId) !== -1) {
        io.sockets.connected[userId].emit('private message', `Message to client with id ${userId}`);

        return res.json({
            message: `Message send to client with id ${userId}`
        });
    } else {
        return res.status(404).json({ message: 'User was not found' });
    }
})

server.listen(port, host, () => {
    console.log(`Server listens http://${host}:${port}`);
});
