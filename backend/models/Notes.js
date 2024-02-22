const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotesScehma = new Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
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
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const Notes = mongoose.model('Notes' , NotesScehma);
module.exports = Notes;
