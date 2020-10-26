const { Router } = require('express');
const AuthController = require('./auth.controller');

const router = Router();

router.post('/sign-up', AuthController.sighUpUser);

router.post('/sign-in', AuthController.signInUser);

router.get('/verify/:token', AuthController.verifyEmail);

module.exports = router;