const express = require('express');
const homeworkController = require('../controllers/homeworkController');
const { isAuthenticated } = require('../helpers/auth');
const router = express.Router();

router.get('/homework/new-homework', isAuthenticated, homeworkController.getNewhomework);

router.post('/homework/new-homework', isAuthenticated, homeworkController.postHomeworkController);

router.post('/homeworks/:id', isAuthenticated, homeworkController.postAnswerController);

router.get('/homeworks/turn/:id', isAuthenticated, homeworkController.getStatusHomework);

router.get('/homeworks/:id', isAuthenticated, homeworkController.getAnswerController);

router.get('/homeworks/edit/:id', isAuthenticated, homeworkController.getEditingHomework);

router.put('/homeworks/edit/:id', isAuthenticated, homeworkController.putEditHomework);

router.put('/homeworks/score/:id', isAuthenticated, homeworkController.putScoreAnswer);

router.delete('/homeworks/delete/:id', isAuthenticated, homeworkController.deleteHomework);

router.get('/homeworks/review/:id', isAuthenticated, homeworkController.getAnswerReview);

router.get('/homeworks/editAnswer/:id', isAuthenticated, homeworkController.getEditAnswer);

router.put('/homeworks/editAnswer/:id', isAuthenticated, homeworkController.putEditAnswer);

module.exports = router;