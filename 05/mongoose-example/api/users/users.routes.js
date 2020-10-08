const { Router } = require('express');
const UsersController = require('./users.controller');

const router = Router();

router.post('/', UsersController.createNewUser);

router.get('/', UsersController.getUsers);

router.get('/:userId', UsersController.validateUserId, UsersController.getUserById);

router.patch('/:userId', UsersController.validateUserId, UsersController.validateUserUpdate, UsersController.updateUserById);

router.delete('/:userId', UsersController.validateUserId, UsersController.deleteUser);

router.patch('/:userId/films/add', UsersController.validateUserId, UsersController.validateAddFilm, UsersController.addFilmToUser);

router.patch('/:userId/films/delete', UsersController.validateUserId, UsersController.deleteFilmFromUser);

module.exports = router;