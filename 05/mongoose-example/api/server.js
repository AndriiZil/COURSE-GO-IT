const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const URI = process.env.MONGO_URI || '';
const PORT = process.env.PORT || 3000;

const usersRouter = require('./users/users.routes');

// console.log('URI', URI)

// Create new server;
// Init middlewares;
// Init Routes;
// Init DB;
// Error hanfler
// Start listening;

class Server {

    constructor() {
        this.server = null;
    }

    async start() {
        this.initServer();
        this.initMiddlewares();
        this.initRoutes();
        await this.initDb();
        // this.initErrorHandler();
        this.startListening();
    }

    initServer() {
        this.server = express();
    }

    initMiddlewares() { 
        this.server.use(express.json());
    }

    initRoutes() {
        this.server.use('/test', (req, res, next) => res.send('Ok'));
        this.server.use('/users', usersRouter);
    }

    async initDb() {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        
        try {
            await mongoose.connect(URI, opts);
        } catch (err) {
            console.log(`Server was closed with connect to db`);
            process.exit(1);
        }

        console.log('DB CONNECTED SUCCESSFULLY!!!');
    }

    initErrorHandler() {

    }

    startListening() {
        console.log('SERVER')
        this.server.listen(
            PORT,
            () => console.log('Server was started.')
        )
    }

}

module.exports = Server;