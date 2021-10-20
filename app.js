//const { application, urlencoded } = require('express');
const express         = require('express');
const session         = require('express-session')
//const { MongoClient } = require('mongodb');
const hbs             = require('express-handlebars')
const passport        = require ('passport')
const localStrategy   = require ('passport-local').Strategy;
const bcrypt          = require ('bcrypt');
const app             = express();
const mongoose        = require('mongoose')

require('dotenv/config');

mongoose.connect("mongodb+srv://dbAdmin:12345@cluster0.ulupg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

//Middleware
app.engine('hbs', hbs ({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(session({
  sercret: "Verygoodsercret",
  resave: false,
  saveUninitialized: true
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,done) {
  done(null, user.id);
})

passport.deserializeUser(function (id, done){
  User.findById(id, function(err, user){
      done(err,user );
  });
});

passport.use(new localStrategy(function(username, passworet, done) {
    User.findOne({username: username}, function (err,  user){
      if (err) return done(err); 
      if (!user) return done(null, false, {message: 'Incorrect username.'}); 
          
      bcrypt.compare(password,user.password, function(err,res){
          if (err) return done(err);
          if (res === false) return done(null,false, {message: 'Incorrect password.' });
          
          return done(null, user);
        });



//Routes

app.get('/', (req, res) => {
  res.render("index",{title: "Home"});
});


// Server listens to the requests

app.listen(3000, () => {
  console.log();"Listening on port 3000"
});


// DB Connection

/*const uri = process.env.db_connection;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = cliersnt.db("test").collection("devices");

  console.log('DB Connection');

  client.close();
})
*/
})}))
