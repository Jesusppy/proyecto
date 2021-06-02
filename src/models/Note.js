const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users' , required: true},
    title: { type:String, required: true},
    description: { type: String, required: true},
    date: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Notes', NoteSchema);
