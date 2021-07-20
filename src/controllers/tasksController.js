const path = require('path');
const Tasks = require('../models/Task');

exports.getTaskList = async(req, res) => {
    const tasks = await Tasks.find();
    res.render('tasks/list', {
        tasks
    });
};

exports.postTaskList = async(req, res) => { 
    const task = new Tasks(req.body);
    await task.save();
    res.redirect('/tasks/list');
};

exports.getStatusList = async(req, res) => {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/tasks/list');
};

exports.getEditList =  async(req,res) => {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    res.render('tasks/edit', {
        task
    });
};

exports.postEditList = async (req, res) => {
    const { id } = req.params;
    await Tasks.updateOne({_id: id}, req.body);
    res.redirect('/tasks/list');
};

exports.deleteTaskList = async(req, res) => {
    const { id } = req.params;
    await Tasks.remove({_id: id });
    res.redirect('/tasks/list');
};

  