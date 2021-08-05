const path = require('path');
var showdown  = require('showdown');
const Note = require('../models/Note');

exports.getAddnotes = (req, res) => {
    res.render('notes/new-note');
};

exports.postAddnotes =  async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push( {text: ' Please write a title'});
    }
    if (!description) {
        errors.push( {text: 'Please write a description'});
    }
    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        }); 
    }else {
        const newNote = new Note({ title, description});
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Note added successfully');
        res.redirect('/notes');
    }
};

exports.getAllnotes =  async (req, res) => {
    const converter = new showdown.Converter();
    const notes = await Note.find({user : req.user.id}).sort({date: 'desc'}).lean();
    notes.forEach(function(note, i){
        notes[i].content = converter.makeHtml(note.description);
    });          
    res.render('notes/all-notes', {
        notes
    });
};

exports.getEditnotes = async(req,res) => {
    const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/notes");
  } 
    res.render('notes/edit-note', {note
    });
};

exports.putEditnotes = async(req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description});
    req.flash('success_msg', 'Note updated successfully');
    res.redirect('/notes');
}; 

exports.deletenotes = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note delected successfully');
    res.redirect('/notes');
};
