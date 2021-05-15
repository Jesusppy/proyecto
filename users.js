const express = require('express');
const router = express.Router();

router.get('/users/register', (req,res) => {
    res.render('users/signup');
});

router.post('/users/signup', (req,res) => {
    console.log(req.body)
    req.session.my_variable=' Hello world';
    res.redirect('profile');
});

router.get('/users/profile', (req, res) => {
    const text = req.session.my_variable;
    delete req.session.my_variable;
    res.render('users/profile', {
        text
    });
})
module.exports = router;