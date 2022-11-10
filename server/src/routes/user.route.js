const express = require('express');
const route = express.Router();

const {getUsers, createUser, deleteUser, editUser} = require('../controllers/user.controller');

route.get('/', getUsers);  
route.post('/registrar', createUser);
route.delete('/:id', deleteUser);
route.put('/edit', editUser);

module.exports = route