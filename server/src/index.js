const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const expressJwt = require('express-jwt');
const  fpInitDB = require('forgot-password');

const config = require('./config/config')
const app = express();

require('./dataBase/db')


const PORT = config.module.PORT

//static files
app.use(express.static('public'))
//middleware
app.use(cors()); //comunica la api con el servidor y ciertos dominios
app.use(morgan('dev'))
app.use(express.json());
fpInitDB(`mongodb+srv://${process.env.DB_CREDENTIALS_USER}:${process.env.DB_CREDENTIALS_PASSWORD}@cluster0.groubjk.mongodb.net/?retryWrites=true&w=majority`)
//Rutas
app.use('/user', require('./routes/user.route'));
app.use('/login', require('./routes/login.route'));
app.use('/product', require('./controllers/products.controller'));

app.listen(PORT, ()=> {
    console.log(`conectado en el puerto: ${PORT}`);
})