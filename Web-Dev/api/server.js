const { application } = require('express');
const express = require('express');

const server = express();



//Routes

server.get('/', (req,res) => {
    res.send('Worked');
})

// Server listens to the requests

server.listen(3000);