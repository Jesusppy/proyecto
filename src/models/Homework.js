const mongoose = require('mongoose');
const { Schema } = mongoose;

const HomeworkSchema = new Schema({
    professor: { type: Schema.Types.ObjectId, ref: 'Users' , required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    active: {type: Boolean, default: true},
    file: {type: Schema.Types.ObjectId, ref: 'Files', required: true},
    timestamp: {type: Date, default: Date.now},
    start: {type: Date, default: Date.now},
    end: {type: Date, required: true},
})

module.exports = mongoose.model('Homeworks', HomeworkSchema);