const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const passport = require('passport');
const errorhandler = require('errorhandler')

const multer = require('multer');



const app = express();
require('./config/passport');

// Connecting to db

mongoose.connect('mongodb://localhost/proyecto', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));

// Importing routes



// Settings

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares

app.use(express.json());
app.use(morgan('dev'));
app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretproject',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));


// Global Variables

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//routes

app.use(require('./controllers/imageController'));
app.use(require('./routes/tasks.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));
// app.use(require('./routes/images.routes'));


// Starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});