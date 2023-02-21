const express = require('express');
const router = express.Router();
const controller = require('./userController');
const { auth } = require('../jwt');

router.post('/login', controller.loginUser);
router.post('/logout', auth, controller.logoutUser);

module.exports = router;
