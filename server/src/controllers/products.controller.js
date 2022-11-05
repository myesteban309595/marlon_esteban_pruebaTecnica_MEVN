const express = require('express')
const route = express.Router();
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')

const product = require('../models/products.model')


//crear un producto
route.post('/createProduct',requireLogin, (req,res)=> {
    console.log("req.user:", req.user);
    const {url, name, price} = req.body
    if(!url || !name || !price){
        return res.status(422).json("por favor ingrese campos válidos");
    }
    //console.log("req.user:", req.user); // manda la info del usuario por el middleware y el token
    
    req.user.password = undefined  // ocultar la password en el result
    
    const producto = new product({
        url: url,
        name: name,
        price: price,
        qualification: 0,
        postedBy: req.user._id
    })

    producto.save()
    .then( result => {
        res.json({product:result})
    })
    .catch(err=> {
        console.log(err);
    })
});

// visualizar  mis productos
route.get('/myProducts',requireLogin, (req,res)=> {
    console.log("req.user:", req.user);

    product.find({postedBy:req.user._id})
    .populate("postedBy", "_id url name price qualification") // al aplicar populate, me muestra todo el objeto del objetId y puedo limintar sus datos a mostrar
    .then(myproduct=> {
        res.json({myproduct})
    })
    .catch(err=> {
        console.log(err);
    })
});

// visualizar todos los productos
route.get('/allproducts', (req,res)=> {
    product.find()
    .populate("postedBy", "_id url name price qualification") 
    .then(products=> {
        res.json(products)
    })
    .catch(err=> {
        console.log(err);
    })
})

module.exports = route