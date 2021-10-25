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

//Middlewares
app.use(express.json());


//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/products', productRoute);
app.listen(4000, () => console.log('Server Up and running'));


