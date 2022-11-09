const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

require('../models/user.model');
const requireLogin = require('../middlewares/requireLogin')

const user = mongoose.model('user')
 
exports.login = async (req,res)=> {
    const {email, password} = req.body;
   
    if(!email || !password){
      res.status(400).json("Correo o contraseña incorrectos");
    }
    await user.findOne({email:email.toLowerCase()})
     .then(savedUser => {
         if(!savedUser){
             return res.status(422).json("Correo o contraseña incorrectos");
            }
            bcrypt.compare(password, savedUser.password)
            .then(doMatch=>{
             console.log("savedUser", savedUser);
            if(doMatch){
                const token = jwt.sign({
                    _id: savedUser._id,
                    name: savedUser.name,
                    admin: savedUser.admin
                }, config.module.JWT_SECRET, {expiresIn:"2h"});
                //let dataUser = {...savedUser._doc, token}
                res.header('auth-token', token).json({data: {token}});  
                //res.status(200).json({...dataUser, token});
            }else {
                return res.status(422).json("Correo o contraseña incorrectos");
            }
        })
     })
     .catch(err =>{
        console.log(err);
     })

}