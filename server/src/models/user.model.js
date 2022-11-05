const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    photo:{
        type: String,
        default: "no photo"
    },
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
    date: {
        type: Date,
        default: Date.now()
    }
    
})

module.exports = mongoose.model('user', userSchema)