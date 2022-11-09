const bcrypt = require('bcrypt');
const mongoose = require('mongoose')

const { validate } = require('../models/user.model');
const user = mongoose.model('user')

exports.getUsers = async (req,res)=> {  
    const getUser = await user.find();
    res.json(getUser)
    console.log("se han obtenido todos los usuarios");
}

exports.createUser = async (req,res)=> {
    const {name,lastName, email, password} = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);

    if(!name || !lastName || !email || !password){
        res.status(404).json('Ingrese informacion válida');
    }else{
        const validateUserExist = await user.findOne({email});
        
        if(validateUserExist){
            res.status(404).json('El usuario ya existe');
        }else{
            const newUser = new user({
              name: name.charAt(0).toUpperCase()+(name.slice(1)).toLowerCase(),
              lastName: lastName.charAt(0).toUpperCase()+(name.slice(1)).toLowerCase(),
              email: email.toLowerCase(),
              password: passwordEncrypted,
            });

            newUser.save()
            res.status(201).json(newUser)
            console.log("se ha registrado un nuevo usuario");
        }
    }
}