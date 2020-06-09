const express = require('express');
const authenticationController = require('./../controllers/authenticationController');
const userController = require('./../controllers/userController');

const router = express.Router();
router.post('/signup', authenticationController.signup);
router.post('/login', authenticationController.login);
router.get('/me', authenticationController.protect, userController.getMe, userController.getUser)
router.get('/:id', userController.getUser);
module.exports = router;