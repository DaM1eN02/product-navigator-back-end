const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    street: {
        type: String,
        max:255,
        default: 'Lohrtalweg 10'
    },
    city: {
        type: String,
        max:255,
        default: '74821 Mosbach'
    },
    birthday: {
        type: String,
        default: '2000-01-01'
    }
});

module.exports = mongoose.model('User', userSchema);
