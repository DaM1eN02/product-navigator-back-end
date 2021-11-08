const router        = require('express').Router();
const verify        = require('./verifyToken');
const Product       = require ('../model/product');
const product = require('../model/product');
const Alexa = require ('ask-sdk');

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

router.post('/searchProductAlexa', async (req, res) => {
    res.contentType('application/json');
    res.type('json');
    const GetProductInformation_Handler =  {
        canHandle(handlerInput) {
            const request = handlerInput.requestEnvelope.request;
            return request.type === 'IntentRequest' && request.intent.name === 'GetProductInformation' ;
        },
        handle(handlerInput) {
            const request = handlerInput.requestEnvelope.request;
            const responseBuilder = handlerInput.responseBuilder;
            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    
            let say = 'Test';
    
            let slotStatus = '';
            let resolvedSlot;
            let slotValues = getSlotValues(request.intent.slots); 
            // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions
            
            const product = null;
            if(slotValues && slotValues.product){
                
                product = product.find({
                    "name": {
                        "$regex": req.body.name,
                        "$options": "i"
                    }
                })
            
                res.send(product);
            }
            

            
            
            // console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
            //   SLOT: product 
            if (slotValues.product.heardAs) {
                slotStatus += ' slot product was heard as ' + slotValues.product.heardAs + '. ';
            } else {
                slotStatus += 'slot product is empty. ';
            }
            if (slotValues.product.ERstatus === 'ER_SUCCESS_MATCH') {
                slotStatus += 'a valid ';
                if(slotValues.product.resolved !== slotValues.product.heardAs) {
                    slotStatus += 'synonym for ' + slotValues.product.resolved + '. '; 
                    } else {
                    slotStatus += 'match. '
                } // else {
                    //
            }
            if (slotValues.product.ERstatus === 'ER_SUCCESS_NO_MATCH') {
                slotStatus += 'which did not match any slot value. ';
                console.log('***** consider adding "' + slotValues.product.heardAs + '" to the custom slot type used by slot product! '); 
            }
    
            if( (slotValues.product.ERstatus === 'ER_SUCCESS_NO_MATCH') ||  (!slotValues.product.heardAs) ) {
                slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('GetProductInformation','product'), 'or');
            }
    
            say += slotStatus;
    
    
            return responseBuilder
                .speak(say)
                .reprompt('try again, ' + say)
                .getResponse();
        },
    }
});



module.exports = router;