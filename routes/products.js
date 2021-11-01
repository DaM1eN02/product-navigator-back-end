const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/products', verify, (req, res) => {
    res.json({
        posts: {
            title: 'Fleischwurst', 
            Preis: '4,50 Euro'
        }
    });
});

module.exports = router;