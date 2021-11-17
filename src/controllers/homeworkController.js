const path = require('path');
const Answers = require('../models/Answer');
const Homeworks = require('../models/Homework');
var showdown  = require('showdown');
const { timeago } = require('../config/helpers');
const { randomNumber } = require('../helpers/libs');
const Files = require('../models/File');
const fs = require('fs-extra');


function formatStringToDate(start) {
    var myDate = start.split('/');
    return new Date(myDate[2], myDate[0] - 1, myDate[1]);
};

exports.getNewhomework = (req, res) => {
    res.render('homework/newHomeworkNEW')
};

exports.postHomeworkController = async (req, res) => {
    const date = req.body.datefilter;
    const fecha = date.split('- ');
    const start = formatStringToDate(fecha[0]);
    const end = formatStringToDate(fecha[1]);

    const docUrl = randomNumber();
    const docTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`src/public/upload/${docUrl}${ext}`);
    let newfile = null;

    if (ext === '.pdf') {
        await fs.rename(docTempPath, targetPath);
        newfile = new Files({
            path: docUrl + ext,
        });
        await newfile.save();

    } else {
        await fs.unlink(docTempPath);
        res.status(500).json({ error: 'Only docs are allowed' });
    };

    const newHomework = new Homeworks({

        professor: req.user._id,
        score: req.body.score,
        title: req.body.title,
        description: req.body.description,
        file: newfile._id,
        start: start,
        end: end,
    });
    await newHomework.save();
    req.flash('success_msg', ' Tarea añadida');
    res.redirect('/homeworks');
}

exports.getStatusHomework = async (req, res) => {
    const { id } = req.params;
    const homework = await Homeworks.findById(id);
    homework.active = !homework.active;
    await homework.save();
    res.redirect('/home');
};

exports.postAnswerController = async (req, res) => {
    const docUrl = randomNumber();
    const docTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`src/public/upload/${docUrl}${ext}`);
    let newfile = null;

    if (ext === '.pdf') {
        await fs.rename(docTempPath, targetPath);
        newfile = new Files({
            path: docUrl + ext,
        });
        await newfile.save();

    } else {
        await fs.unlink(docTempPath);
        res.status(500).json({ error: 'Only docs are allowed' });
    };

    const id = req.params.id;
    const newAnswer = new Answers({
        homework: id,
        student: req.user._id,
        score: req.body.score,
        title: req.body.title,
        description: req.body.description,
        file: newfile._id,
    });
    await newAnswer.save();
    req.flash('success_msg', ' Respuesta añadida');
    res.redirect('/homeworks');

};

exports.getAnswerController = async (req, res) => {
    const id = req.params.id;
    //const answers= await Note.find({user : req.user.id}).sort({date: 'desc'}).lean();        
    const homework = await Homeworks.findOne({ _id: id }).populate('professor file');
    if (req.user.role === 'professor' || req.user.role === 'admin') {
        const answers = await Answers.find({ homework: id }).populate('student file');
        res.render('homework/watchHomeworkNEW', {
            answers,
            homework,
            timeago
        });

    } else if (req.user.role === 'student') {
        const converter = new showdown.Converter();
        const answers = await Answers.findOne({ student: req.user.id, homework: id }).populate('student file');
        homework.description = converter.makeHtml(homework.description);
        if (answers) {
            answers.content = converter.makeHtml(answers.description);
        }
        res.render('homework/makeAnswerNEW', {
            answers,
            homework,
            timeago
        });
    } else {
        res.render('homework/makeAnswerNEW', {
            anwers: [],
            homework,
            timeago
        });
    };
};



exports.getEditingHomework = async (req, res) => {
    const homework = await Homeworks.findOne({ _id: req.params.id }).populate('professor file');
    if (req.user.role === 'professor' || req.user.role === 'admin') {
        res.render('homework/EditHomeworkNEW', {
            homework,
            timeago
        });
    } else {
        res.redirect('/home');
    };
};


exports.putEditHomework = async (req, res) => {
    const date = req.body.datefilter;
    const fecha = date.split('- ');
    const docUrl = randomNumber();
    const docTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve(`src/public/upload/${docUrl}${ext}`);
    let newfile = null;

    if (ext === '.pdf') {
        await fs.rename(docTempPath, targetPath);
        newfile = new Files({
            path: docUrl + ext,
        });
        await newfile.save();

    } else {
        await fs.unlink(docTempPath);
        res.status(500).json({ error: 'Only docs are allowed' });
    };

    const id = req.params.id;
    const homework = await Homeworks.findOne({ _id: id }).populate('professor file');
    homework.title = req.body.title;
    homework.description = req.body.description;
    homework.file = newfile._id;
    homework.start = formatStringToDate(fecha[0]);
    homework.end = formatStringToDate(fecha[1]);
    await homework.save();
    req.flash('success_msg', ' Tarea editada');
    res.redirect('/admin/homeworks');
};

exports.putScoreAnswer = async (req, res) => {
    console.log('Entreee');
    const { score } = req.body;
    await Answers.findByIdAndUpdate(req.params.id, { score }, { new: true });
    req.flash('success_msg', 'Puntuación actualizada');
    res.redirect('/homeworks');
};  


exports.deleteHomework = async (req, res) => {
    const id = req.params.id;
    await Homeworks.findByIdAndDelete(id);
    req.flash('success_msg', 'Tarea borrada');
    res.redirect('/admin/homeworks');
};

exports.getAnswerReview = async (req, res) => {
    const converter = new showdown.Converter();
    const id = req.params.id;
    const answers = await Answers.findOne({ _id: id }).populate('student file homework');
    const homework = answers.homework;
    answers.content = converter.makeHtml(answers.description);    
        res.render('homework/reviewAnswerNEW', {
            homework,
            answers,
            timeago
        });
};

exports.getEditAnswer = async (req, res) => {
    const id = req.params.id;
    const answer = await Answers.findById(id).populate('homework student file');
        res.render('homework/editAnswerNEW', {
            answer,
            timeago
        });
        req.flash('success_msg', 'Respuesta actualizada');
};

exports.putEditAnswer = async (req, res) => {
    const { title, description, file, data } = req.body;
    await Answers.findByIdAndUpdate(req.params.id, { title, description, file, data }, { new: true });
    req.flash('success_msg', 'Respuesta actualizada');
    res.redirect('/homeworks');
};


