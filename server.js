const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv/config');

const server = express();



//Routes

server.get('/', (req,res) => {
    if (req = 3000) {
        res.send('Worked');
    }
})

// Server listens to the requests

server.listen(3000);


// DB Connection

const uri = process.env.db_connection;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");

  console.log('DB Connection');
  
  client.close();
});
