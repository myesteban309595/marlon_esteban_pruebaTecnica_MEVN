const { validate } = require('../models/user.model');
const user = require('../models/user.model')

exports.getUsers = async (req,res)=> {  
    const getUser = await user.find();
    res.json(getUser)
    console.log("se han obtenido todos los usuarios");
}

exports.createUser = async (req,res)=> {
    const {name,lastName, age, email, password} = req.body;

    if(name, lastName, age, email, password){
        const validateUserExist = await user.findOne({email});
        
        if(validateUserExist){
            res.status(404).json('El usuario ya existe');
            console.log("el usuario ya existe");
        }else{
            const newUser = new user({
              name: name,
              lastName: lastName,
              age: age,
              email: email,
              password: password,
              productos: []
            });

            newUser.save()
            res.status(200).json(newUser)
            console.log("se ha registrado un nuevo usuario");
        }
    }else{
        res.status(404).json('Ingrese informacion válida');
    }
}