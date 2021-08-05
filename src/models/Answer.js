const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnswerSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Users' , required: true},
    score: {type: Number, default: 0},
    homework: { type: Schema.Types.ObjectId, ref: 'Homeworks' , required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    done: {type: Boolean, default: false},
    file: {type: Schema.Types.ObjectId, ref: 'Files', required: true },
    timestamp: {type: Date, default: Date.now},

})

module.exports = mongoose.model('Answers', AnswerSchema);