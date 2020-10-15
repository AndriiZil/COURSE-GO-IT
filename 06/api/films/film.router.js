const { Router } = require('express');
const FilmController = require('./film.controller');

const router = Router();

router.get('/', FilmController.getFilms);

router.post('/', FilmController.createFilm);

module.exports = router;