const express = require('express');
const config = require('./config/config')
require('./dataBase/db')
const app = express();

const PORT = config.module.PORT

//middleware
app.use(express.json());

//Rutas


app.listen(PORT, ()=> {
    console.log(`conectado en el puerto: ${PORT}`);
})