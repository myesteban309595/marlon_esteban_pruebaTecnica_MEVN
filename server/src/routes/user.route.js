const express = require('express');
const route = express.Router();

const {getUsers, createUser, deleteUser, editUser } = require('../controllers/user.controller');

route.get('/', getUsers);  
route.post('/registrar', createUser);
route.delete('/:id', deleteUser);
route.put('/:id', editUser);
route.post('/forgot', )
route.patch('/reset', )

module.exports = route