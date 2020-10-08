const { Router } = require('express');
const UsersController = require('./users.controller');

const router = Router();

router.post('/', UsersController.createNewUser);

router.get('/', UsersController.getUsers);

router.get('/:userId', UsersController.getUserById);

router.patch('/:userId', UsersController.updateUserById);

router.delete('/:userId', UsersController.deleteUser);

router.patch('/:id/films/add', UsersController.addFilmToUser);

router.patch('/:id/films/delete', UsersController.deleteFilmFromUser);

module.exports = router;