const router        = require('express').Router();
const verify        = require('./verifyToken');
const Product       = require ('../model/product');
const product = require('../model/product');

//Add a product
router.post('/addProduct', async (req, res) => {
    res.contentType('application/json');
    res.type('json');

    //Checking if the email exist
    const productExist = await Product.findOne({name: req.body.name });
    if(productExist) return res.status(400).send({message:'Product already exists'});
    
    //Create new product
    const product = new Product(
        {
        name:               req.body.name,
        price:              req.body.price,          
        kcal:               req.body.kcal,
        fat:                req.body.fat,
        carbohydrate:       req.body.carbohydrate,            
        protein:            req.body.protein,
        salt:               req.body.salt,
        location:           req.body.location
        
        });

    //CATCH THE ERROR
    try {
        const savedProduct = await product.save();
        res.send(savedProduct);
        }  catch(err){
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

    const product2 = await Product.findOneAndUpdate(
        {
            name: req.body.name,
        },
        {
            price:              req.body.price,          
            kcal:               req.body.kcal,
            fat:                req.body.fat,
            carbohydrate:       req.body.carbohydrate,
            protein:            req.body.protein,
            salt:               req.body.salt,
            location:           req.body.location

        });
    res.send({message: 'Product updated'});
});

router.post('/searchProduct', async (req, res) => {
     const products = await Product.aggregate(
        [
            // Match first to reduce documents to those where the array contains the match
            { "$match": {
                "products": { "$regex": req.body.name, "$options": "i" }
            }},
    
            // Unwind to "de-normalize" the document per array element
            { "$unwind": "$products" },
    
            // Now filter those document for the elements that match
            { "$match": {
                "products": { "$regex": req.body.name, "$options": "i" }
            }},
            { "$group": {
                "_id": "$_id",
                "name": {"$first": "$name"},
                "price": {"$first": "$price"},
                "kcal": {"$first": "$kcal"},
                "fat": {"$first": "$fat"},
                "carbohydrate": {"$first": "$carbohydrate"},
                "protein": {"$first": "$protein"},
                "salt": {"$first": "$salt"},
                "location": {"$first": "$location"}
            }}
        ],
        function(err,results) {
            res.send(results)
        } 
    )
});



module.exports = router;