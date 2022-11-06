const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

const users_controller = require('../controllers/users_controller');

const postController = require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication,postController.create);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);

module.exports = router;