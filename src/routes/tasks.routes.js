const express = require('express');
const tasksController = require('../controllers/tasksController');
const { isAuthenticated } = require('../helpers/auth');

const router = express.Router();

router.get('/tasks/list', isAuthenticated, tasksController.getTaskList );

router.post('/tasks/add', isAuthenticated, tasksController.postTaskList);

router.get('/tasks/turn/:id', isAuthenticated, tasksController.getStatusList);

router.get('/tasks/edit/:id', isAuthenticated, tasksController.getEditList);

router.post('/tasks/edit/:id', isAuthenticated, tasksController.postEditList);
    
router.get('/tasks/delete/:id', isAuthenticated, tasksController.deleteTaskList);


module.exports = router;