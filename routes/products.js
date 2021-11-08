const router            = require('express').Router();
const verify            = require('./verifyToken');
const Product           = require ('../model/product');
const product           = require('../model/product');
const Alexa             = require ('ask-sdk-core');
const {ExpressAdapter } = require ("ask-sdk-express-adapter");
const launchRequest     = require('../launchRequest');

//Add a product
router.post('/addProduct', async (req, res) => {
    res.contentType('application/json');
    res.type('json');

    //Checking if the email exist
    const productExist = await Product.findOne({
        name: req.body.name
    });
    if(productExist) return res.status(400).send({
        message:'Product already exists'
    });
    
    //Create new product
    const product = new Product({
        name:               req.body.name,
        price:              req.body.price,          
        kcal:               req.body.kcal,
        fat:                req.body.fat,
        carbohydrate:       req.body.carbohydrate,            
        protein:            req.body.protein,
        salt:               req.body.salt,
        location:           req.body.location, 
        stock:              req.body.stock
    });

    //CATCH THE ERROR
    try {
        const savedProduct = await product.save();
        res.send(savedProduct);
    } catch(err){
        res.status(400).send(err);
    }
});


//Update a product
router.post('/updateProduct', async (req, res) => {
    res.contentType('application/json');
    res.type('json');
      
    //Checking if the product exist
    const product = await Product.findOne({name: req.body.name });
    if(!product) {
        res.status(400);
        return res.send({message: 'Product is not found'});
    }

    const product2 = await Product.findOneAndUpdate({
        name: req.body.name,
    },
    {
            price:              req.body.price,          
            kcal:               req.body.kcal,
            fat:                req.body.fat,
            carbohydrate:       req.body.carbohydrate,
            protein:            req.body.protein,
            salt:               req.body.salt,
            location:           req.body.location,
            stock:              req.body.stock

    });

    res.send({
        message: 'Product updated'
    });
});

router.post('/deleteProduct', async (req, res) => {
    res.contentType('application/json');
    res.type('json');
    const product = await Product.deleteOne({
        name: req.body.name
    });
    res.send({
        message: 'Product deleted'
    })
})

router.post('/searchProduct', async (req, res) => {
    res.contentType('application/json');
    res.type('json');

    const products = await Product.find({
        "name": {
            "$regex": req.body.name,
            "$options": "i"
        }
    })

    res.send(products);
});


const skill = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        launchRequest
    )
    .create();

const adapter           = new ExpressAdapter(skill, true, true);

router.post('/searchProductAlexa', adapter.getRequestHandlers());



module.exports = router;