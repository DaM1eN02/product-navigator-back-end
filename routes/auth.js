const router                                    = require ('express').Router();
const User                                      = require ('../model/user');
const Product                                   = require ('../model/user');
const {registerValidation, loginValidation }    = require ('../validation');
const bcrypt                                    = require ('bcrypt');
const jwt                                       = require ('jsonwebtoken');
const { access } = require('fs');
const { allow } = require('@hapi/joi');


//Register
router.post('/register', async (req, res) => {

    //LETS VALIDATE TGHE DATA BEFORE WE MAKE A USER
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //CHECK IF USER IS IN DATABASE
    const emailExist = await User.findOne({email: req.body.email });
    if(emailExist) return res.status(400).send('Email already exists');

    const nameExist = await User.findOne({name: req.body.name});
    if(nameExist) return res.status(400).send('Username already exists');

    //HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new User
    const user = new User({
        name:   req.body.name,
        email:  req.body.email,
        password: hashedPassword
    });

    //CATCH THE ERROR
    try {
        const savedUser = await user.save();
        res.send(savedUser);
        }  catch(err){
        res.status(400).send(err);
        }
});


//Login
router.post('/login', async (req, res) => {
    res.contentType('application/json');
    res.type('json');

    const {error} = loginValidation(req.body);
    if(error) {
        res.status(400);
        return res.send(error.details[0].message);
    }
      
    //Checking if the email exist
    const user = await User.findOne({email: req.body.email });
    if(!user) {
        res.status(400);
        return res.send({message: 'Email ist not found'});
    }

    //PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) {
        res.status(400);
        return res.send({message: 'Invalid password'});
    }
    res.send({message: 'Logged in!'});
});


//UPDATE DATA
router.post('/update', async (req, res) => {
    res.contentType('application/json');
    res.type('json');
      
    //Checking if the email exist
    const user = await User.findOne({name: req.body.name });
    if(!user) {
        res.status(400);
        return res.send({message: 'Username ist not found'});
    }
    //Find and update user
    const user2 = await User.findOneAndUpdate(
        {
            name: req.body.name,
        },
        {
            email:      req.body.email,
            password:   req.body.password,
            street:     req.body.street,
            city:       req.body.city,
        });
    res.send({message: 'Data Updated'});
});

module.exports = router;
 
 