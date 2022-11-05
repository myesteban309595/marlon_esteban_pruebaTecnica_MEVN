const bcrypt = require('bcrypt');
const user = require('../models/user.model')

exports.login = async (req,res)=> {
    const {email, password} = req.body

    const validateEmail = await user.findOne({email:email});
    
    if(validateEmail){
        const validPassword = await bcrypt.compare(password, validateEmail.password)
        if(validPassword){
            res.status(200).json("ingresado")
        }else{
            res.json("contraseña incorrecta");
        }
    }else{
        res.status(404).json("El usuario no Existe");
    }
}