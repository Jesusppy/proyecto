const { response } = require('express');
const express = require('express');
const router = express.Router();

const Tasks = require('../models/Task');
const { isAuthenticated } = require('../helpers/auth');

router.get('/tasks/list', async(req, res) => {
    const tasks = await Tasks.find();
    res.render('tasks/list', {
        tasks
    });
});

router.post('/tasks/add', async(req, res) => { 
        const task = new Tasks(req.body);
        await task.save();
        res.redirect('/tasks/list');
});

router.get('/tasks/turn/:id', async(req, res) => {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/tasks/list');
});

router.get('/tasks/edit/:id', async(req,res) => {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    res.render('tasks/edit', {
        task
    });
 });

 router.post('/tasks/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Tasks.updateOne({_id: id}, req.body);
    res.redirect('/tasks/list');

 });
    

router.get('/tasks/delete/:id', async(req, res) => {
    const { id } = req.params;
    await Tasks.remove({_id: id });
    res.redirect('/tasks/list');
});

module.exports = router;