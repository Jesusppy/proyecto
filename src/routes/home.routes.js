const express = require('express');
const homeController = require('../controllers/homeController');
const { isAuthenticated } = require('../helpers/auth');
const router = express.Router();

router.get('/home',isAuthenticated, homeController.getHome);

module.exports = router;