const { Router } = require('express');
const UserController = require('./user.controller');

const router = Router();

router.post('/', UserController.validateUserCreate, UserController.createNewUser);

router.put('/sign-in', UserController.validateUserSignIn, UserController.signIn);

router.get('/', UserController.authorize, UserController.getUsers);

// router.get('/catalog', UserController.authorize, UserController)

module.exports = router;