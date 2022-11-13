const bcrypt = require('bcrypt');
const mongoose = require('mongoose')

const user = require('../models/user.model')

exports.getUsers = async (req,res)=> {  
    const getUser = await user.find();
    res.json(getUser)
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
              lastName: lastName.charAt(0).toUpperCase()+(lastName.slice(1)).toLowerCase(),
              email: email.toLowerCase(),
              password: passwordEncrypted,
            });
            newUser.save()
            res.status(201).json(newUser)
        }
    }
}

exports.editUser = async (req, res) => {
    try{
        const {_id} = req.params
        const updatedUser = await user.updateOne({_id:_id}, req.body)
        .then(()=>res.json("Usuario actualizado"))
    } catch(error) {
        res.json({message: error.message})
    }
};

exports.deleteUser = async (req, res) => {
    try{
        const {id} = req.params
      await user.deleteOne({_id:id})
        .then(()=> res.json("Se ha eliminado el usuario"))
    } catch(error) {
        res.json({message: error.message})
    }
};

exports.forgotPassword = async (req, res) => {
    const {email} = req.body
    if(!(email)){
        return res.status(400).json('El correo es requerido')
    }
    const message = 'Revisa tu correo electronico'
    let verifycationLink;
    let emailStatus ='OK'
}