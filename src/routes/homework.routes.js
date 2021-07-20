const express = require('express');
const homeworkController = require('../controllers/homeworkController');
const { isAuthenticated } = require('../helpers/auth');
const router = express.Router();

router.get('/homework/new-homework',isAuthenticated, homeworkController.getNewhomework);

router.post('/homework/new-homework',isAuthenticated, homeworkController.postHomeworkController);

router.post('/homeworks/:id', isAuthenticated, homeworkController.postAnswerController);

router.get('/homeworks/turn/:id', isAuthenticated, homeworkController.getStatusHomework);

router.get('/homeworks/:id', isAuthenticated, homeworkController.getAnswerController);

// router.put('/homeworks/edit:id', isAuthenticated, homeworkController.putAnswerController);

module.exports = router;