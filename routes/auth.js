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
    res.contentType('application/json');
    res.type('json');

    //LETS VALIDATE THE DATA BEFORE WE MAKE A USER
    const {error} = registerValidation(req.body);
    if(error) {
        res.status(400);
        return res.send({
            result: 'false',
            message: error.details[0].message
        });
    }

    //CHECK IF USER IS IN DATABASE
    const emailExist = await User.findOne({
        email: req.body.email
    });
    if(emailExist) {
        res.status(400);
        return res.send({
            result: 'false',
            message: 'E-Mail already exists'
        });
    }

    const nameExist = await User.findOne({
        name: req.body.name
    });
    if(nameExist) {
        res.status(400);
        return res.send({
            result: 'false',
            message: 'Username already exists'
        });
    }

    //HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    //CATCH THE ERROR
    try {
        const savedUser = await user.save();
        const dbuser = await User.findOne({
            email: req.body.email
        });

        res.send({
            id: dbuser._id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            city: '74821 Mosbach',
            street: 'Lohrtalweg 10',
            birthday: '2000-01-01',
            result: 'true',
            message: 'You are registered'
        });
    }
    catch(err){
        res.send({
            result: 'false',
            message: err
        });
    }
});


//Login
router.post('/login', async (req, res) => {
    res.contentType('application/json');
    res.type('json');

    const {error} = loginValidation(req.body);
    if(error) {
        res.status(400);
        return res.send({
            result: 'false',
            message: error.details[0].message
        });
    } 

    //Checking if the email or username exists
    let user = {
        password: "",
        email: ""
    }
    let user2 = {
        _id: "",
        name: "",
        email: "",
        password: "",
        city: "",
        street: "",
        birthday: ""
    }

    if (req.body.name == "undefined") {
        const userEmail = await User.findOne({
            email: req.body.email
        });
        if (!userEmail) {
            res.status(404);
            return res.send({
                result: 'false',
                message: 'Username or E-Mail was not found'
            });
        }
        user = userEmail;
    }
    else {
        const userName = await User.findOne({
            name: req.body.name
        });
        if (!userName) {
            res.status(404);
            return res.send({
                result: 'false',
                message: 'Username or E-Mail was not found'
            });
        }
        user = userName;
    }
    
    //PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) {
        res.status(400);
        return res.send({
            result: 'false',
            message: 'Wrong Password'
        });
    }

    user2 = await User.findOne({
        email: user.email
    });

    res.send({
        id: user2._id,
        name: user2.name,
        email: req.body.email,
        password: req.body.password,
        city: user2.city,
        street: user2.street,
        birthday: user2.birthday,
        result: 'true',
        message: 'You are Logged In'
    });
});

//UPDATE DATA
router.post('/update', async (req, res) => {
    res.contentType('application/json');
    res.type('json');
      
    //Checking if the email exist
    const user = await User.findOne({
        name: req.body.name
    });

    if(!user) {
        res.status(400);
        return res.send({
            result: 'false',
            message: 'Somethign went wrong'
        });
    }

    //Hash the password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Find and update user
    const user2 = await User.findOneAndUpdate(
        {
            name: req.body.name,
        },
        {
            email:      req.body.email,
            password:   hashedPassword,
            street:     req.body.street,
            city:       req.body.city,
            birthday:   req.body.birthday
        });
    res.send({
        result: 'true',
        message: 'User Data is updated'
    });
});
module.exports = router;