const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const authRouter = require('./auth/auth.router');

const { error } = require('dotenv').config();

if (error) {
    throw new Error(error);
}

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
        this.errorHandler();
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
        this.server.use('/auth', authRouter);
    }

    async initDbConnection() {
        try {
            mongoose.set('debug', true);

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
            () => console.log(`Server was started on port: ${PORT}.`)
        )
    }

    errorHandler() {
        this.server.use((err, req, res, next) => {
            if (err) {
                const code = err.code || err.status || 500;
                const message = err.message || 'Server error';

                return res.status(code).send({ message });
            }
            next();
        });
    }
}

module.exports = Server;
