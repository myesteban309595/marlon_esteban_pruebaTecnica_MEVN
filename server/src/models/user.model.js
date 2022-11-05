const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    productos: [],
    
})

module.exports = mongoose.model('user', userSchema)