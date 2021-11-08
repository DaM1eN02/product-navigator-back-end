const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//Import Routes
const authRoute = require('./routes/auth');
const productRoute = require('./routes/products');

dotenv.config();

//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT, {
    UseNewUrlParser: true
},
() => console.log ('connected to db!'));

const whitelist = ["https://product-navigator.herokuapp.com"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}

//CrossDomain
const PORT = process.env.PORT || 80;

//Middlewares
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");    
    next();
});
// app.use(cors(corsOptions));

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/products', productRoute);
app.listen(PORT, () => console.log('Server Up and running'));