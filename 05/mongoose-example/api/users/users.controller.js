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

}

module.exports = new UsersController();