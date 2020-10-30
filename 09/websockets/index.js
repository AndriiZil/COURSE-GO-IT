const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 3000
});

wss.broadcast = function(data, clientValidator = () => true) {
    this.clients.forEach(client => {
        if (clientValidator(client)) {
            client.send(data);
        }
    });
}

wss.on('connection', ws => {
    console.log('connected');

    ws.on('message', message => {
        wss.broadcast(message, client => client !== ws)
    });
})