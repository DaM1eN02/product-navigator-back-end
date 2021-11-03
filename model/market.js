const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    street: {
        type: String,
        required: true,
        max: 255
    },
    city:{
        type: String,
        required: true,
        max: 255
    }
});


module.exports = mongoose.model('Market', marketSchema);