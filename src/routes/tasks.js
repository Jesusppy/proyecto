const { response } = require('express');
const express = require('express');
const router = express.Router();

const Task = require('../models/task');
const { isAuthenticated } = require('../helpers/auth');

router.get('/tasks/list', async(req, res) => {
    const tasks = await Task.find();
    res.render('tasks/list', {
        tasks
    });
});

router.post('/tasks/add', async(req, res) => { 
        const task = new Task(req.body);
        await task.save();
        res.redirect('/tasks/list');
});

router.get('/tasks/turn/:id', async(req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/tasks/list');
});

router.get('/tasks/edit/:id', async(req,res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('tasks/edit', {
        task
    });
 });

 router.post('/tasks/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Task.updateOne({_id: id}, req.body);
    res.redirect('/tasks/list');

 });
    

router.get('/tasks/delete/:id', async(req, res) => {
    const { id } = req.params;
    await Task.remove({_id: id });
    res.redirect('/tasks/list');
});

module.exports = router;