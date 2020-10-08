const { Types: { ObjectId } } = require('mongoose');
const Joi = require('joi');
const UserModel = require('./users.model');

class UsersController {

    async createNewUser(req, res, next) {
        try {

            const newUser = await UserModel.create(req.body);

            const preparedUser = UsersController.prepareUserResponse([newUser]);

            return res.send(preparedUser);
        } catch (err) {
            next(err);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await UserModel.find();

            const preparedUsers = UsersController.prepareUserResponse(users);

            return res.send(preparedUsers);
        } catch (err) {
            // next(err);
            return res.status(400).send({ error: err.message ? err.message : 'Something went wrong.'});
        }
    }

    async getUserById(req, res, next) {
        try {
            const user = await UserModel.findById(req.params.userId);

            if (!updatedUser) {
                return res.status(404).send({ message: 'User was not found.' });
            }

            const preparedUser = UsersController.prepareUserResponse([user]);

            return res.send(preparedUser);
        } catch (err) {
            next(err);
        }
    }

    async updateUserById(req, res, next) {
        try {
            const user = await UserModel.findByIdAndUpdate(req.params.userId, req.body, { new: true });

            if (!updatedUser) {
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

            if (!updatedUser) {
                return res.status(404).send({ message: 'User was not found.' });
            }

            const preparedUser = UsersController.prepareUserResponse([user]);

            return res.send(preparedUser);
        } catch (err) {
            next(err);
        }
    }

    async addFilmToUser(req, res, next) {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(req.params.userId, {
                $push: { films: req.body }
            }, { new: true });

            if (!updatedUser) {
                return res.status(404).send({ message: 'User was not found.' });
            }

            const preparedUser = UsersController.prepareUserResponse([updatedUser]);

            return res.send(preparedUser);

        } catch (err) {
            next(err);
        }
    }

    async deleteFilmFromUser(req, res, next) {
        try {

            const updatedUser = await UserModel.findByIdAndUpdate(req.params.userId, {
                $pull: { films: { _id: req.body.filmId }}
            }, { new: true });

            if (!updatedUser) {
                return res.status(404).send({ message: 'User was not found.' });
            }

            const preparedUser = UsersController.prepareUserResponse([updatedUser]);

            return res.send(preparedUser);
        } catch (err) {
            next(err);
        }
    }

    static prepareUserResponse(users) {
        return users.map(({ _id, name, email, films }) => {
            return {
                name,
                email,
                id: _id,
                films
            }
        })
    }

    validateUserId(req, res, next) {
        if (!ObjectId.isValid(req.params.userId)) {
            return res.status(422).send({ message: 'User id is not valid' });
        }
        next();
    }

    validateUserUpdate(req, res, next) {
        const validateRulesSchema = Joi.object({
            name: Joi.string(),
            email: Joi.string()
        });

        UsersController.checkErrorValidation(validateRulesSchema, req, res, next);
    }

    validateAddFilm(req, res, next) {
        const validateRulesSchema = Joi.object({
            name: Joi.string().required()
        });

        UsersController.checkErrorValidation(validateRulesSchema, req, res, next);
    }

    static checkErrorValidation(shema, req, res, next) {
        const { error } = shema.validate(req.body);

        if (error) {
            const { message } = error.details[0];
            return res.status(422).send({ error: message });
        }

        next();
    }

}

module.exports = new UsersController();