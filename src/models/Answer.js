const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnswerSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Users' , required: true},
    homework: { type: Schema.Types.ObjectId, ref: 'Homeworks' , required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    done: {type: Boolean, default: false},
    file: {type: Schema.Types.ObjectId, ref: 'Files', required: false },
    timestamp: {type: Date, default: Date.now},

})

module.exports = mongoose.model('Answers', AnswerSchema);