const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users_controller');

router.get('/profile',users_controller.users);

router.get('/sign-up',users_controller.signUp);

router.get('/sign-in',users_controller.signIn);

router.post('/create',users_controller.create);

router.post('/create-session',users_controller.createSession);

router.get('/sign-out',users_controller.SignOut);

module.exports = router;