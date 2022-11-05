const express = require('express');
const route = express.Router();

const {getUsers, createUser} = require('../controllers/user.controller');

route.get('/', getUsers);  
route.post('/', createUser);

module.exports = route