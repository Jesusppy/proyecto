const express = require('express');
const notesController = require('../controllers/notesController');
const { isAuthenticated } = require('../helpers/auth');

const router = express.Router();

router.get('/notes/add',isAuthenticated, notesController.getAddnotes);

router.post('/notes/new-note',isAuthenticated, notesController.postAddnotes );

router.get('/notes',isAuthenticated, notesController.getAllnotes );

router.get('/notes/edit/:id',isAuthenticated, notesController.getEditnotes);

router.put('/notes/edit-note/:id',isAuthenticated, notesController.putEditnotes);

router.delete('/notes/delete/:id',isAuthenticated, notesController.deletenotes);

module.exports = router;