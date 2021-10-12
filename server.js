const express = require('express');

const server = express();



//Routes

server.get('/', (req,res) => {
    if (req = 3000) {
        res.send('Worked');
    }
})

// Server listens to the requests

server.listen(3000);