const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");

//Insert product to database
//http://localhost:1000/products
router.post("/products", (req, res)=>{
    //Create Product instance
    const newProduct = new Product({
        name: req.body.name,
        type: req.body.type,
        imageurl:req.body.imageurl
    })

    //Insert to DB
    Product.create(newProduct, (err, data)=>{
        if(err){
            res.status(500).send({
                message:err.message || "Some error occured while inserting the new product"
            })
        }else{
            res.send(data)
        }
    })
})

//Get all Products
//http://localhost:1000/products
router.get("/products", (req,res)=>{
    Product.getAll((err, data)=>{
        if(err){
            res.status(500).send({
              message:
                err.message ||
                "Some error occured while inserting the new product",
            });
        }else{
            res.send(data);
        }
    })
})

//Get product by Id
//http://localhost:1000/products/3
router.get("/products/:id", (req,res)=>{
    const productId = Number.parseInt(req.params.id);
    Product.getById(productId, (err, data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    message:"Product not found with this id "+productId
                }
                )
            }else{
                res.status(500).send({
                  message:
                    err.message ||
                    "Some error occured while inserting the new product",
                }); 
            }
        }else{
            res.send(data)
        }
    })
});

//Update product attributes
router.put("/products/:id", (req,res)=>{
    const productId = Number.parseInt(req.params.id);
    if(req.body.constructor === Object && Object.keys(req.body).length ===0){
        res.status(400).send({
            message: "Attributes can not be empty !"
        })
    }
    Product.updateById(productId, new Product(req.body), (err, data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                  message: "Product not found with this id " + productId
                });
            }else{
               res.status(500).send({
                 message:
                   err.message ||
                   "Some error occured while updating the new product",
               });  
            }
        }else{
            res.send(data);
        }
    })
})

router.delete("/products/:id", (req, res)=>{
    const productId = Number.parseInt(req.params.id);
    Product.deleteById(productId, (err, data)=>{
          if (err) {
            if (err.kind === "not_found") {
              res.status(400).send({
                message: "Product not found with this id " + productId,
              });
            } else {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occured while updating the new product",
              });
            }
          } else {
           res.send({
            message: " Product id: "+ productId + " is deleted"
           })
          }
    })
})

module.exports = router;