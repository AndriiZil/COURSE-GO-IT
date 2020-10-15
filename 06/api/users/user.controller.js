const UserModel = require('./user.model');
const FilmModel = require('../films/film.model');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { Types: { ObjectId } } = require('mongoose');

class UserController {

    async createNewUser(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const createdUser = await UserModel.findOne({ email });

            if (createdUser) {
                return res.status(400).send({ message: 'User is already exists' });
            }

            const hashPassword = await bcrypt.hash(password, 5);

            await UserModel.create({
                name,
                email,
                password: hashPassword
            });

            return res.status(201).send({ user: {
                name,
                email
            }});
        } catch (err) {
            next(err);
        }
    }


    async signIn(req, res, next) {
        try {

            const { email, password } = req.body;

            const user = await UserModel.find({ email });

            if (!user) {
                return res.status(404).send({ message: 'User was not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user[0].password);

            if (!isPasswordValid) {
                return res.send({ message: 'Authentication failed.' });
            }

            const token = await jwt.sign({ id: user[0].id, email: user[0].email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

            const updatedUser = await UserModel.findByIdAndUpdate(user[0].id, {
                token
            }, { new: true });

            return res.send(UserController.validateUserResponse([updatedUser]));
        } catch (err) {
            next(err);
        }
    }

    async getUsers(req, res, next) {
        try {
            const name = req.query.name;

            // const users = await UserModel.find(name ? { name } : {}).select('-token');
            const users = await UserModel.find();

            return res.send(UserController.validateUserResponse(users));

        } catch(err) {
            next(err);
        }
    }

    async authorize(req, res, next) {
        try {
            const authorizationHeader = req.get('Authorization') || '';

            let token;

            if (authorizationHeader) {
                token = authorizationHeader.split(' ')[1];
            }

            let userId;
            try {
                userId = await jwt.verify(token, process.env.TOKEN_SECRET).id;

                } catch(err) {
                    console.log(err);
                }

                const user = await UserModel.findById(userId);

                if (!user || user.token !== token) {
                    return res.status(401).send({ message: 'Authorization failed' });
                }

            req.user = UserController.validateUserResponse([user]);

            next();

        } catch (err) {
            next(err);
        }
    }

    async getCurrentUser(req, res, next) {
        try {
            const user = usereq.r;

            console.log(user);

            return res.send(user[0]);
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        try {

            await UserModel.findByIdAndUpdate(req.user[0].id, {
                token: null
            }, { new: true });

            return res.send({ message: 'success' });

        } catch (err) {
            next(err);
        }
    }

    async addFilmToUser(req, res, next) {
        try {
            const filmId = req.params.id;

            const film = await FilmModel.findById(filmId);

            if (!film) {
                // return res.status(404).send({ message: 'Film not found' });
                const error = new Error('Film not found');
                error.code = 404;
                throw error;
            }

            const updatedUser = await UserModel.findByIdAndUpdate(req.user[0].id, {
                $push: { favouriteFilms: filmId }
            }, { new: true });

            return res.send(UserController.validateUserResponse([updatedUser]));
        } catch(err) {
            next(err);
        }
    }

    async removeFilmFromUser(req, res, next) {
        try {
            const filmId = req.params.id;

            const film = await FilmModel.findById(filmId);

            if (!film) {
                return res.status(404).send({ message: 'Film not found' });
            }

            const updatedUser = await UserModel.findByIdAndUpdate(req.user[0].id, {
                $pull: { favouriteFilms: filmId }
            }, { new: true });

            return res.send(UserController.validateUserResponse([updatedUser]));
        } catch (err) {
            next(err);
        }
    }

    async joinFilm(req, res, next) {
        try {
            const userId = req.user[0].id;

            console.log(userId);

            const userWithFilms = await UserModel.aggregate([
                { $match: { _id: ObjectId(userId) } },
                {
                    $lookup: {
                        from: 'films',
                        localField: 'favouriteFilms',
                        foreignField: '_id',
                        as: 'films'
                    }
                }
            ]);

            return res.send(userWithFilms);
        } catch (err) {
            next(err);
        }
    }

    async populateFilms(req, res, next) {
        try {
            const userWithFilms = await UserModel
                .findById(req.user[0].id)
                .populate('favouriteFilms');

            return res.send(userWithFilms);

        } catch (err) {
            next(err);
        }
    }


    validateUserCreate(req, res, next) {
        const rulesSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        });

        UserController.checkValidationError(rulesSchema, req, res, next);
    }

    validateUserSignIn(req, res, next) {
        const rulesSchema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        });

        UserController.checkValidationError(rulesSchema, req, res, next);
    }

    static validateUserResponse(users) {
        return users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: user.token,
                filmsIds: user.favouriteFilms ? user.favouriteFilms : []
            }
        });
    }

    static checkValidationError(schema, req, res, next) {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(422).send({ message: error.details[0].message });
        }

        next();
    }

}

module.exports = new UserController;