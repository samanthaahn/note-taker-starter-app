// Import express.js
const express = require('express');
// Import built-in node.js package 'path' to resolve path of files that are located on the server.
const path = require('path');
// This require the file from the database 
const db = require('./db/db.json');
// This requires the write file 
const fs = require('fs');
// This specifies which port the express.js will run on. 
const PORT = 3001; 
// Initialize an instance of express.js
const app  = express();

// Middleware for parsing applicatoin/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Static middleware pointing to the public folder
app.use(express.static('public'));

//Create Express.js routes for defualt '/' 
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname,  '/public/index.html'))
);
// This takes the user to the notes section of the public folder 
app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname,  '/public/notes.html'))
);

app.get('/api/notes', (req,rest) => {
res.sendFile(path.join(__dirname,'/db/db.json'))
});

// This allows for the user to actually save and post their notes to the page
app.post('/api/notes', (req,res) => {

    let newNote = req.body;
    let newID = uniqid();

    newNote.id = newID;

    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        let dbFile = JSON.parse(data);
        dbFile.push(newNote);

    fs.writeFile('./db/db.json',JSON.stringify(dbFile), (err) => {
        if(err)throw err;
        console.log('New note saved!📝')
    });
    });
res.redirect('/notes');
});

// This takes care of the delete portion of the notes. If you click on the "trash" icon it will delete your note
app.delete('/api/notes/:id', (req,res) => {
    const noteId = req.params.id;

    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        let dbFile = JSON.parse(data);
        const newDbFile = dbFile.filer(note => note.id !== noteId);

    fs.writeFile('./db/db.json',JSON.stringify(newDbFile),(err) => {
        if(err) throw err;
        console.log('Your note has been deletes!');
    });
    });
    res.redirect('/notes');
});

// This is a general selector "*"
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});



// This initializes everything
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🤎`)
);