const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();


router.get('/users/signin', usersController.getSignIn);

router.post('/users/signin', usersController.postSignIn);

router.get('/users/signup', usersController.getSignUp);

router.post('/users/signup', usersController.postSignUp);

router.get('/users/logout', usersController.getLogout);

module.exports = router;