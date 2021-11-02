const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    price: {
        type: String,
        required: true,
        max: 255
    },
    nutritionalValues:{
        type: String,
        required: true,
        max: 255
    },
    location:{
        type: String,
        required: True
    }
});


module.exports = mongoose.model('Product', productSchema);