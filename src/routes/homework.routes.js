const express = require('express');
const homeworkController = require('../controllers/homeworkController');
const { isAuthenticated } = require('../helpers/auth');
const router = express.Router();

router.get('/homework/new-homework',isAuthenticated, homeworkController.getNewhomework);

router.post('/homework/new-homework',isAuthenticated, homeworkController.postHomeworkController);

router.post('/homeworks/:id', isAuthenticated, homeworkController.postAnswerController);

router.get('/homeworks/turn/:id', isAuthenticated, homeworkController.getStatusHomework);

router.get('/homeworks/:id', isAuthenticated, homeworkController.getAnswerController);

router.get('/homeworks/edit/:id', isAuthenticated, homeworkController.getEditingHomework);

router.put('/homeworks/edit/:id',isAuthenticated, homeworkController.putEditHomework);

router.delete('/homeworks/delete/:id', isAuthenticated, homeworkController.deleteHomework);

// router.get('/homeworks/watch/:id', isAuthenticated, homeworkController.getWatchingHomework);

module.exports = router;