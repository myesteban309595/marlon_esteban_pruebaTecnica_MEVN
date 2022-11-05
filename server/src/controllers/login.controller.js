const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

require('../models/user.model');
const requireLogin = require('../middlewares/requireLogin')

const user = mongoose.model('user')

exports.login = async (req,res)=> {
    const {email, password} = req.body

    if(!email || !password){
      res.status(400).json("ingrese datos válidos")
    }
    await user.findOne({email:email})
     .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error:"invalid email or password"});
        }
        bcrypt.compare(password, savedUser.password)
         .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id}, config.module.JWT_SECRET);
                res.json({token})
            }else {
                return res.status(422).json("el correo o la contraseña no son válidos")
            }
        })
     })
     .catch(err =>{
        console.log(err);
     })

}