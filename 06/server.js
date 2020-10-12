const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const usersRouter = require('./api/users/user.router');

require('dotenv').config();

class Server {

    constructor() {
        this.server = null;
    }


    async start() {
        this.initServer();
        this.initMiddleware();
        this.initRoutes();
        await this.initDbConnection();
        this.startListening();
    }

    initServer() {
        this.server = express();
    }

    initMiddleware() {
        this.server.disable('x-powered-by');
        this.server.use(express.json());
        this.server.use(morgan('dev'));
    }

    initRoutes() {
        this.server.use('/users', usersRouter);
    }

    async initDbConnection() {
        try {
            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            }
            await mongoose.connect(process.env.MONGO_URI, options);

            console.log('DB CONNECTED');
        } catch (err) {
            console.log(err);
        }
    }

    startListening() {
        this.server.listen(
            process.env.PORT,
            () => console.log('Server was started.')
        )
    }

}

module.exports = Server;