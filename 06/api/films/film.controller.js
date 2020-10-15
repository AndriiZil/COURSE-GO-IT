const FilmModel = require('./film.model');

class FilmController {

    async getFilms(req, res, next) {
        try {
            const { sort, skip, limit } = req.query;

            const users = await FilmModel
                .find()
                .select('-__v')
                .sort(sort ? { name: parseInt(sort) } : { name: 1 })
                .skip(skip ? parseInt(skip) : 0)
                .limit(limit ? parseInt(limit) : 0)

            return res.send(users);
        } catch (err) {
            next(err);
        }
    }

    async createFilm(req, res, next) {
        try {
            const film = await FilmModel.create(req.body);

            return res.status(201).send(film);
        } catch(err) {
            next(err);
        }
    }

}

module.exports = new FilmController();