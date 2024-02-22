const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotesScehma = new Schema({
    title:{
       type: String,
       required: true,
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = NotesScehma;
