const path = require('path');
const Users = require('../models/User');

const passport = require('passport');


exports.getSignIn = (req,res) => {
    res.render('users/signin');
};

exports.postSignIn = passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/users/signin',
    failureflash: true,
    passReqToCallback: true
});

exports.getSignUp = (req, res) => {  
    res.render('users/signup')
};

exports.postSignUp = async (req,res) => {
    const { name, email,exp, password, confirm_password } = req.body;
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
            exp,
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
                exp,
                password
            });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', ' You are registered');
            res.redirect('/users/signin');
        }
};
 

exports.roleUser = async (req, res) => {
    const id = req.body.id.trim();
    const role = req.body.role;
    await Users.findByIdAndUpdate(id, {role});
    res.json({})
};

exports.getProfileUser = async (req, res) => {
    const id = req.params.id;
    const user = await Users.findById(id);
    res.render('users/profile', {user});
};

exports.editProfileUser = async (req, res) => { 
    const { id } = req.params;
    const user = await Users.findById(id);
    res.render('users/edit', {user});
    console.log(user);
};

exports.updateProfileUser = async (req, res) => {
    const { id } = req.params;
    await Users.updateOne({_id: id}, req.body);
    res.redirect('/users/' + id);
};

exports.getLogout = (req, res) => {
    req.logout();
    res.redirect('/');
};
