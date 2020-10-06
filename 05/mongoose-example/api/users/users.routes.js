const { Router } = require('express');
const UsersController = require('./users.controller');

const router = Router();

router.post('/', UsersController.createNewUser);

module.exports = router;