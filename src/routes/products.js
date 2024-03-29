const express = require('express');
const Contenedor = require("../managers/contenedorProductos");
const ContenedorSql = require("../managers/contenedorSql");
const options = require("../config/dbConfig");
const ProductMock = require("../mocks/productsMock")

const router = express.Router();

// const productosApi = new Contenedor("productos.txt");
const productosApi = new ContenedorSql(options.mariaDB, "products");
const productApi = new ProductMock();

router.get('/',async(req,res)=>{
    const productos = await productosApi.getAll();
    res.send(productos);
})

router.get('/:id',async(req,res)=>{
    const productId = req.params.id;
    const product = await productosApi.getById(parseInt(productId));
    if(product){
        return res.send(product)
    } else{
        return res.send({error : 'producto no encontrado'})
    }
})

router.post('/',async(req,res)=>{
    const newProduct = req.body;
    const result = await productosApi.save(newProduct);
    res.send(result);
})

router.post("/generar-productos", (req,res)=>{
    const { cant } = req.query
    let results = productApi.populate(parseInt(cant))
    res.send(results)
})

router.put('/:id',async(req,res)=>{
    const cambioObj = req.body;
    const productId = req.params.id;
    const result = await productosApi.updateById(parseInt(productId),cambioObj);
    res.send(result);
})

router.delete('/:id',async(req,res)=>{
    const productId = req.params.id;
    const result = await productosApi.deleteById(parseInt(productId));
    res.send(result);
})

module.exports = {productsRouter:router};