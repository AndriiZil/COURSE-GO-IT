const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const usersRouter = require('./api/users/user.router');
const filmsRouter = require('./api/films/film.router');

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
        this.server.use('/users', usersRouter);
        this.server.use('/films', filmsRouter);
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
            () => console.log('Server was started.')
        )
    }

    errorHandler() {
        this.server.use((err, req, res, next) => {
            if (err) {
                return res.status(400).send({ message: err.message });
            }
            next();
        }) 
    }

}

module.exports = Server;