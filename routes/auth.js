const router                                    = require ('express').Router();
const User                                      = require ('../model/User');
const {registerValidation, loginValidation }    = require ('../validation');
const bcrypt                                    = require ('bcrypt');
const jwt                                       = require ('jsonwebtoken');


router.post('/register', async (req, res) => {

    //LETS VALIDATE TGHE DATA BEFORE WE MAKE A USER
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //CHECK OF USER IS IN DATABASE

    const emailExist = await User.findOne({email: req.body.email });
    if(emailExist) return res.status(400).send('Email already exists');


    //HASH THE PASSWORD

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

//Create new User

  const user = new User({
        name:   req.body.name,
        email:  req.body.email,
        password: hashedPassword
    })
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
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
      
    //Checking if the email exist
    const user = await User.findOne({email: req.body.email });
    if(!user) return res.status(400).send('Email ist not found');
    //PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    res.send("../Web-Dev/front-end/pages/home/home.html");

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});




 module.exports = router;
 
 