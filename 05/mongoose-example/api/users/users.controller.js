const mongoose = require('mongoose');
const UserModel = require('./users.model');

class UsersController {

    async createNewUser(req, res, next) {
        try {

            const newUser = await UserModel.create(req.body);

            return res.send(newUser);
        } catch (err) {
            next(err);
        }
    }

    async getUsers(req, res, next) {
        try {
            
            const users = await UserModel.find();

            return res.send(users);
        } catch (err) {
            // next(err);
            return res.status(400).send({ error: err.message ? err.message : 'Something went wrong.'});
        }
    }

    async getUserById(req, res, next) {
        try {
            // console.log('PARAMS:', req.params);
            const user = await UserModel.findById(req.params.userId);

            if (!user) {
                return res.status(404).send({ message: 'User was not found.' });
            }

            return res.send([user]);
        } catch (err) {
            next(err);
        }
    }

    async updateUserById(req, res, next) {
        try {

            const user = await UserModel.findByIdAndUpdate(req.params.userId, req.body, { new: true });

            if (!user) {
                return res.status(404).send({ message: 'User was not found.' });
            }

            return res.status(204).end();
        } catch (err) {
            next(err);
        }
    }

    async deleteUser(req, res, next) {
        try {

            const user = await UserModel.findByIdAndDelete(req.params.userId);

            if (!user) {
                return res.status(404).send({ message: 'User was not found.' });
            }

            return res.send(user);
        } catch (err) {
            next(err);
        }
    }

    async addFilmToUser(req, res, next) {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
                $push: { films: req.body }
            }, { new: true });

            return res.send(updatedUser);

        } catch (err) {
            next(err);
        }
    }

    async deleteFilmFromUser(req, res, next) {
        try {

            const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
                $pull: { films: { _id: req.body.filmId }}
            }, { new: true });

            return res.send(updatedUser);
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new UsersController();