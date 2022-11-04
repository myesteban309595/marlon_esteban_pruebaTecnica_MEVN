const mongoose = require('mongoose')
const config = require('../config/config');
const userModel = require('../models/user.model');

const DB_CREDENTIALS_PASSWORD = config.module.DB_CREDENTIALS_PASSWORD;
const DB_CREDENTIALS_USER = config.module.DB_CREDENTIALS_USER;

const DB_URL_CONNECTION = `mongodb+srv://${DB_CREDENTIALS_USER}:${DB_CREDENTIALS_PASSWORD}@cluster0.groubjk.mongodb.net/?retryWrites=true&w=majority` ;

console.log(DB_URL_CONNECTION);
(async()=>{
    await mongoose.connect(DB_URL_CONNECTION,{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() =>{
        console.log("conectado a la base de datos")
    })
    .catch((error) => {
        console.error(error)
    });

    const existingUser = await userModel.find();

    if(existingUser.length === 0)
    {
        const user1 = new userModel({
           email: "maryoe_95@hotmail.com",
           password: "admin123"
        }) 
        user1.save()
    }
})();