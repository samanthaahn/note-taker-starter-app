// Import express.js
const express = require('express');
// Import built-in node.js package 'path' to resolve path of files that are located on the server.
const path = require('path');
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
app.get('/', (req, res) => res.send('Navigate to /send or /routes'));









app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);