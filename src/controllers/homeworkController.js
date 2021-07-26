const path = require('path');
const Answers = require('../models/Answer');
const Homeworks = require('../models/Homework');
const { timeago } = require('../config/helpers');
const { randomNumber } = require('../helpers/libs');
const Files = require('../models/File');
const fs = require('fs-extra');


function formatStringToDate(start) {
    var myDate = start.split('/');
    return new Date(myDate[2], myDate[0] - 1, myDate[1]);
};

exports.getNewhomework = (req, res) => {
    res.render('homework/newHomework')
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
        title: req.body.title,
        description: req.body.description,
        file: newfile._id,
    });
    await newAnswer.save();
    console.log(newAnswer);
    req.flash('success_msg', ' Respuesta añadida');
    res.redirect('/homeworks');

};

exports.getAnswerController = async (req, res) => {
    const id = req.params.id;
    //const answers= await Note.find({user : req.user.id}).sort({date: 'desc'}).lean();        
    const homework = await Homeworks.findOne({ _id: id }).populate('professor file');
    if (req.user.role === 'professor') {
        const answers = await Answers.find({ homework: id }).populate('student file');
        res.render('homework/watchHomework', {
            answers,
            homework,
            timeago
        });

    } else if (req.user.role === 'student') {
        const answers = await Answers.find({ student: req.user.id, homework: id }).populate('student file');
        console.log(answers);
        res.render('homework/makeAnswer', {
            answers,
            homework,
            timeago
        });
        console.log(answers)
    };
};

exports.getEditingHomework = async (req, res) => {
    const homework = await Homeworks.findOne({ _id: req.params.id }).populate('professor file');
    if (req.user.role === 'professor') {
        res.render('homework/editHomework', {
            homework,
            timeago
        });
    } else {
        res.redirect('/home');
    };
};


exports.putEditHomework = async (req, res) => {
    const { title, description, file, data } = req.body;
    await Homeworks.findByIdAndUpdate(req.params.id, { title, description, file, data }, { new: true });
    req.flash('success_msg', 'Tarea actualizada');
    res.redirect('/homeworks');
};

exports.deleteHomework = async (req, res) => {
    const id = req.params.id;
    await Homeworks.findByIdAndDelete(id);
    req.flash('success_msg', 'Tarea borrada');
    res.redirect('/homeworks');
};

exports.getAnswerReview = async (req, res) => {
    const id = req.params.id;
    const homework = await Homeworks.findOne({ _id: id }).populate('professor file');
    if (req.user.role === 'professor') {
        const answers = await Answers.find({ homework: id }).populate('student file');
        res.render('homework/reviewAnswer', {
            homework,
            answers,
            timeago
        });
    };
};

exports.getEditAnswer = async


