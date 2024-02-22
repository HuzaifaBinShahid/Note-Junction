const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')



const JWT_SECRET = 'Huzaifaisawebdevl@per';

// Router  1: Ftech All notes from database using get | Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }


});


// Router 2: Add notes to database using userID | POST | Login Required

router.post('/addnotes', fetchuser, [
    body('title', "Enter A valid title").isLength({ min: 3 }),
    body('description', "Description must be more longer than 5 characters").isLength({ min: 5 }),
], async (req, res) => {

    try {

        const { title, description, tag } = req.body


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() })
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })


        const savedNote = await note.save();
        res.send(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//Router 3: Update the notes using Put | Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    // Extract title description and tag from user body to find it (using destructuring here)
    const { title, description, tag } = req.body;

    try {
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the Note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
            
        // If a different user tries to delete it dont allow
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

// Router 4: Deleting a note using DELETE | Login Required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {


    try {

        // Find the Note to be deleted and delete it
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Note not Found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        const deletedNote = await Notes.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            res.status(404).send("Note not found")
        }

        res.send({"Success" : "Following Note has been deleted" , note:note});


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;