const path = require('path');
const Users = require('../models/User');

const passport = require('passport');


exports.getSignIn = (req,res) => {
    res.render('users/signin');
};

exports.postSignIn = passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureflash: true,
    passReqToCallback: true
});

exports.getSignUp = (req, res) => {  
    res.render('users/signup')
};

exports.postSignUp = async (req,res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push({ text: 'Please insert your name'});
    }
    if (password != confirm_password) {
        errors.push({ text: 'Password do not match'});
   }
    if (password.length < 4 ) {
        errors.push({ text: 'Password must be at least 4 characters'});
    }
    if (errors.length > 0 ) {
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        });
     } else {
         const emailUser = await Users.findOne({email: email});
        if (emailUser) {
             req.flash('error_msg', 'Email is already in use');
             res.redirect('/users/signup');
        }
            const newUser = new Users({
                name,
                email, 
                password
            });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', ' You are registered');
            res.redirect('/users/signin');
        }
};

exports.getLogout = (req,res) => {
    req.logout();
    res.redirect('/');
};