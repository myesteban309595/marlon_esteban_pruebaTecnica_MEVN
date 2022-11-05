const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const user = mongoose.model('user')
const config = require('../config/config')

module.exports = (req,res,next)=> {
    // authorization  === Bearer 4rtsdlkfjlkdf
    // const {authorization} = req.headers();
    const token = req.header('auth-token');
    console.log("authorization require.login:",token);
    //const token = authorization.replace("Bearer ", "");
    
    if(!token){
       console.log("not authorized");
       return res.status(401).json("No se encuentra loggeado");
    }
    try{
       const verified= jwt.verify(token, config.module.JWT_SECRET)
         req.user = verified;
         next();
        
        // const {_id} = payload;
        // user.findById(_id)
        //  .then(userdata=> {
        //     req.user = userdata;
        // })
    }
    catch (error) {
        return res.status(403).json("Token invalido");
    }
}