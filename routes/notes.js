const notes = require('express').Router();

notes.get('/', (req, rest) => {
    console.info(  `${req.method} request recieved for notes!`);
    readFromFile('./db/db.json').then((data) => rest.json(JSON.parse(((data)))));
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

modeule.exports = notes; 