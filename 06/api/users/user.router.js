const { Router } = require('express');
const UserController = require('./user.controller');

const router = Router();

router.get('/test', (req, res) => res.send('ok'));

router.post('/', UserController.validateUserCreate, UserController.createNewUser);

router.put('/sign-in', UserController.validateUserSignIn, UserController.signIn);

router.get('/', UserController.authorize, UserController.getUsers);

router.get('/current', UserController.authorize, UserController.getCurrentUser);

router.put('/logout', UserController.authorize, UserController.logout);

router.put('/addFilm/:id', UserController.authorize, UserController.addFilmToUser);

router.delete('/removeFilm/:id', UserController.authorize, UserController.removeFilmFromUser);

router.get('/joinFilms', UserController.authorize, UserController.joinFilm);

router.get('/populated', UserController.authorize, UserController.populateFilms);

// router.get('/catalog', UserController.authorize, UserController)

module.exports = router;