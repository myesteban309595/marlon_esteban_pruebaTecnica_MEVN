const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const user = mongoose.model('user')
const {JWT_SECRET} = require('../config/config')

module.exports = (req,res,next)=> {
    const {authorization} = req.headers;
    console.log("authorization require.login:",authorization);
    // authorization  === Bearer 4rtsdlkfjlkdf
    if(!authorization){
       console.log("not authorized");
       return res.status(401).json("No se encuentra loggeado");
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err){
           return res.status(403).json("No se encuentra loggeado");
        }
        const {_id} = payload;
        user.findById(_id)
         .then(userdata=> {
            req.user = userdata;
            next();
        })
    })
}