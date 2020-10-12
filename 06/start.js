const Server = require('./server');

new Server().start().catch(err => console.log(err));