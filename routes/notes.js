const notes = require('express').Router();

// function readFromFile('./db/db.json'){

// };

// function readAndAppend(newNote, './db/db.json'){

// };

notes.get('/', (req, res) => {
    console.info(  `${req.method} request recieved for notes!`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(((data)))));
});

notes.post('/', (req,res) => {
    console.info(`${req.method} request recieved to add notes!`);
    console.log(req.body);

    const { title, text } = req.body

    if(req.body) {
        const newNote = {
            title,
            text,
        };
        readAndAppend(newNote, './db/db.json');
        res.json('New note added!');
    }else{
        res.errored('Error in adding new note!');
    }
});

module.exports = notes; 