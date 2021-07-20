const mongoose = require('mongoose');
const { Schema } = mongoose;

const FileSchema = new Schema ({
    name: {type: String},
    path: { type: String, required: true},
    timestamp: { type: Date, default: Date.now},
    mime_type: {type: String}

});

module.exports = mongoose.model('Files', FileSchema);