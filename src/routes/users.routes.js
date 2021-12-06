const express = require('express');
const usersController = require('../controllers/usersController');
const { isAuthenticated } = require('../helpers/auth');
const router = express.Router();


router.get('/users/signin', usersController.getSignIn);

router.post('/users/signin', usersController.postSignIn);

router.get('/users/signup', usersController.getSignUp);

router.post('/users/signup', usersController.postSignUp);

router.put('/users/edit',isAuthenticated, usersController.roleUser);

router.get('/users/:id',isAuthenticated, usersController.getProfileUser);

router.get('/users/edit/:id',isAuthenticated, usersController.editProfileUser);

router.put('/users/edit/:id',isAuthenticated, usersController.updateProfileUser);

router.delete('/users/delete/:id',isAuthenticated, usersController.deleteUser);

router.get('/auth/logout', usersController.getLogout);



module.exports = router;