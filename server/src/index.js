const express = require('express');
const config = require('./config/config')
const app = express();
require('./dataBase/db')

const PORT = config.module.PORT

//middleware
app.use(express.json());

//Rutas
app.use('/user', require('./routes/user.route'));
app.use('/login', require('./routes/login.route'));
app.use('/product', require('./controllers/products.controller'));

app.listen(PORT, ()=> {
    console.log(`conectado en el puerto: ${PORT}`);
})