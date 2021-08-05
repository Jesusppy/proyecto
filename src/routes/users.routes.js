const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();


router.get('/users/signin', usersController.getSignIn);

router.post('/users/signin', usersController.postSignIn);

router.get('/users/signup', usersController.getSignUp);

router.post('/users/signup', usersController.postSignUp);

router.put('/users/edit', usersController.roleUser);

router.get('/users/:id', usersController.getProfileUser);

router.get('/users/edit/:id', usersController.editProfileUser);

router.put('/users/edit/:id', usersController.updateProfileUser);

router.delete('/users/delete/:id', usersController.deleteUser);

router.get('/auth/logout', usersController.getLogout);



module.exports = router;