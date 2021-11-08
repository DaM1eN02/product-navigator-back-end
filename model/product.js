const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    marketID: {
        type: Number,
        required: true,
    },
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
    kcal:{
        type: String,
        required: true,
        max: 255
    },
    fat:{
        type: String,
        required: true,
        max: 255
    },
    carbohydrate:{
        type: String,
        required: true,
        max: 255
    },
    protein:{
        type: String,
        required: true,
        max: 255
    },
    salt:{
        type: String,
        required: true,
        max: 255
    },
    location:{
        type: String,
        required: true,
        default: "Kein Standort verfügbar"
    },
    stock:{
        type: String,
        required: true,
        default: "0 ME"
    }
});


module.exports = mongoose.model('Product', productSchema);