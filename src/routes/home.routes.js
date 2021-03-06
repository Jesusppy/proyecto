const express = require('express');
const homeController = require('../controllers/homeController');
const { isAuthenticated } = require('../helpers/auth');
const router = express.Router();

router.get('/home', isAuthenticated, homeController.getIndex);

router.get('/admin/homeworks', isAuthenticated, homeController.getAdminHomeworks);

router.get('/homeworks',isAuthenticated, homeController.getHomeworks);

router.get('/simulator', isAuthenticated, homeController.getSimulator);

router.get('/about', homeController.getAbout);

module.exports = router;