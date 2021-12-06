const path = require('path');
const Users = require('../models/User');
const Homeworks = require('../models/Homework');
const { isAuthenticated } = require('../helpers/auth');

const passport = require('passport');

exports.getHomeworks = async (req, res) => {
    if (req.user.role === 'admin' ) {
        const users = await Users.find();
        res.render('users/adminNEW', {
            users
        });
    } else if (req.user.role === 'professor' || req.user.role == 'admin') {
            const homeworks = await Homeworks.find().populate('professor');
            res.render('users/professorNEW', {
            homeworks
        });

    }else {
        let homeworks  = await Homeworks.find({active: true, start: {"$lte": Date.now()}, end: {"$gt": Date.now()} });

        res.render('homework/answerNEW', {
        homeworks
        });

    }
    res.render('home');
};

exports.getAdminHomeworks = async (req,res) => {
     if (req.user.role === 'professor' || req.user.role == 'admin') {
            const homeworks = await Homeworks.find().populate('professor');
            res.render('users/professorNEW', {
            homeworks
        });

    }else {
        let homeworks  = await Homeworks.find({active: true, start: {"$lte": Date.now()}, end: {"$gt": Date.now()} });

        res.render('homework/answerNEW', {
        homeworks
        });

    }
};

exports.getSimulator = async (req, res) => {
    res.render('simulatorNEW');
};


exports.getAbout = async (req, res) => {
    res.render('aboutUs');
};


exports.getIndex = async (req, res) => {
    res.render('homeNEW');
};


