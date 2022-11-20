const express = require('express');
const passport = require('../../../config/passport-jwt-local-strategy');

const router = express.Router();
const postAPI = require('../../../controllers/api/v1/post_api');

router.get('/',postAPI.index)
router.delete('/:id',passport.authenticate('jwt',{session: false}) ,postAPI.destroy);

module.exports = router;