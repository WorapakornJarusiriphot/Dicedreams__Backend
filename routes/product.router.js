const express = require("express");
const router = express.Router();
const Product = require("../controllers/product.controller");
const { authJwt } = require("../middleware");

// Insert new product to DB
// http://localhost:1000/products
router.post("/products", [authJwt.verifyToken, authJwt.isAdmin], async (req,res)=>{
    try {
    const newProduct = req.body;
    console.log(newProduct)
    const createProduct = await Product.createProduct(newProduct);
    console.log(createProduct)
    res.status(201).json(createProduct);
   }catch (err){
    res.status(500).json({err:"product.router.js :: Fail to create product"});
    }
});

//Get All product
router.get("/products", async(req, res)=>{
    try {
        const products = await Product.getAll();
        console.log(products)
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({err:"product.router.js :: Fail to create product"});
    }
})

// get Product By ID
router.get("/products/:id", [authJwt.verifyToken], async(req, res)=>{
    try {
        const productId = req.params.id;
        const product = await Product.getById(productId);
        res.status(200).json(product);
    } catch (error) {
        if (error.kind === "not_found") {
          res.status(404).json({ error: "product.router.js :: Product not found" });
        } else {
        res.status(500).json({err:"product.router.js :: Fail to create product by Id"});
      }
    }
})

// Update a product data 
router.put("/products/:id", [authJwt.verifyToken, authJwt.isAdmin], async(req, res)=>{
  try {
    const productId = req.params.id;
    const productData = req.body;
    const product = await Product.updateById(
        productId,
        productData
        );
        res.status(200).json(product);
  } catch (error) {
    if (error.kind === "not_found") {
        res.status(400).json({ error: "product.router.js :: Product not found "});
    }else {
        res.status(500).json({ error: "product.router.js :: Failed to update product data"});
    }
  }
});

//Delete
router.delete("/products/:id",[authJwt.verifyToken, authJwt.isAdmin], async(req, res)=>{
    try {
        const productId = req.params.id;
        const product = await Product.removeById(productId);
        if (product) {
            res.status(200)
            .json({
                message: "Product id " + productId + " is deleted",
                isDelete: product,
            });
        }
    } catch (error) {
        if (error.kind === "not_found") {
            res.status(404).json({ error: "product.router.js :: Product not found "});
        }else {
            res.status(500).json({ error: "product.router.js :: Failed to update product data"});
        }
      }
    });
module.exports = router;