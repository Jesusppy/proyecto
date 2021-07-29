const path = require('path');
const Users = require('../models/User');
const Homeworks = require('../models/Homework');

const passport = require('passport');

exports.getHomeworks = async (req, res) => {
    if (req.user.role === 'admin' ) {
        const users = await Users.find();
        res.render('users/admin', {
            users
        });
    } else if (req.user.role === 'professor' && req.user.role == 'admin') {
            const homeworks = await Homeworks.find().populate('professor');
            res.render('users/professor', {
            homeworks
        });

    }else {
        let homeworks  = await Homeworks.find({active: true, start: {"$lte": Date.now()}, end: {"$gt": Date.now()} });

        res.render('homework/answer', {
        homeworks
        });

    }
    res.render('home');
};

exports.getAdminHomeworks = async (req,res) => {
     if (req.user.role === 'professor' && req.user.role == 'admin') {
            const homeworks = await Homeworks.find().populate('professor');
            res.render('users/professor', {
            homeworks
        });

    }else {
        let homeworks  = await Homeworks.find({active: true, start: {"$lte": Date.now()}, end: {"$gt": Date.now()} });

        res.render('homework/answer', {
        homeworks
        });

    }
    res.render('home');
};


exports.getIndex = async (req, res) => {
    res.render('home');
};


