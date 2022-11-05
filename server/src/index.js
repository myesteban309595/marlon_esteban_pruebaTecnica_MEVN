const express = require('express');
const config = require('./config/config')
require('./dataBase/db')
const app = express();

const PORT = config.module.PORT

//middleware
app.use(express.json());

//Rutas
app.use('/user', require('./routes/user.route'));
app.use('/login', require('./routes/login.route'))

app.listen(PORT, ()=> {
    console.log(`conectado en el puerto: ${PORT}`);
})