const express   = require('express');
const app       = express();
const mongoose  = require ('mongoose');
const dotenv    = require('dotenv');

//Import Routes
const authRoute = require('./routes/auth');
const productRoute = require('./routes/products');

dotenv.config();

//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT, {UseNewUrlParser: true },
() => console.log ('connected to db!'));

//CrossDomain
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

//Middlewares
app.use(express.json());
app.use(allowCrossDomain);

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/products', productRoute);
app.listen(3000, () => console.log('Server Up and running'));


