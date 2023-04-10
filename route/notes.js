const notes = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');
const path = require('path');
const uuid = require('../helper/uuid');



notes.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'../db/db.json'))
    });

// This allows for the user to actually save and post their notes to the page
notes.post('/', (req,res) => {

    let newNote = req.body;
    let newID = uuid();

    newNote.id = newID;

    fs.readFile(path.join(__dirname,'../db/db.json'), (err, data) => {
        if(err) throw err;
        let dbFile = JSON.parse(data);
        dbFile.push(newNote);

    fs.writeFile(path.join(__dirname,'../db/db.json'),JSON.stringify(dbFile), (err) => {
        if(err)throw err;
        console.log('New note saved!📝')
    });
    });
res.redirect('/notes');
});

// This takes care of the delete portion of the notes. If you click on the "trash" icon it will delete your note
notes.delete('/:id', (req,res) => {
    const noteId = req.params.id;

    fs.readFile(path.join(__dirname,'../db/db.json'), (err, data) => {
        if(err) throw err;
        let dbFile = JSON.parse(data);
        const newDbFile = dbFile.filer(note => note.id !== noteId);

    fs.writeFile(path.join(__dirname,'../db/db.json'),JSON.stringify(newDbFile),(err) => {
        if(err) throw err;
        console.log('Your note has been deletes!');
    });
    });
    res.redirect('/notes');
});

module.exports = notes;