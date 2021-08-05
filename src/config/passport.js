const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;

const Users = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
   const user = await Users.findOne({email: email});
    if (!user) {
        return done(null, false, req.flash('error', 'Not User found.'));      
    } else {
       const match = await user.matchPassword(password);
     if (match) {
            return done(null, user);
        } else {
            return done(null, false, req.flash('error', 'Incorrect Password'));
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const user = await Users.findById(id, (err, user) => {
        done(err, user);
    });
});