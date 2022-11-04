const mongoose = require('mongoose')
const config = require('../config/config')

const DB_CREDENTIALS_PASSWORD = config.module.DB_CREDENTIALS_PASSWORD;
const DB_CREDENTIALS_USER = config.module.DB_CREDENTIALS_USER;

const DB_URL_CONNECTION = `mongodb+srv://${DB_CREDENTIALS_USER}:${DB_CREDENTIALS_PASSWORD}@cluster0.tx4uwtg.mongodb.net/?retryWrites=true&w=majority` ;

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
    
})();