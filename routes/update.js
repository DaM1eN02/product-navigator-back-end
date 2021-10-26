const express       = require('express');
const router        = express.Router();
const User          = require ('../model/User');

router.get('/',(req, res) => {
    res.send('We are on post')
});

router.get('/:userID', async(req, res)=>{
    try{
        const User = await User.findbyId(req.params.UserId);
        res.json(User);
    }
    catch(error){
        res.json({message:error});
    }  
});

module.exports = router;