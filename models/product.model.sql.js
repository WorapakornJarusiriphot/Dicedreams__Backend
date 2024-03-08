const sql = require("./db.sql");

//Constructor
const Product = function (product) { 
   //Attributes
  this.id = product.id; 
  this.title = product.title;
  this.imagePath = product.imagePath;
  this.description = product.description;
  this.price = product.price;
  this.category = product.category;
};

//Method
//Insert new product
Product.create = (newProduct, result) => {
  //INSERT INTO product (id, title, imagePath, description, price, category) VALUES ("1", "...", "...", "...")
  sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("product.model.sql.js : error", err);
      result(err, null);
      return;
    }
    console.log("product.model.sql.js :: New product inserted:", { id: res.id, ...newProduct });
    result(null, { id: res.id, ...newProduct });
  });
};

//Get All Product
Product.getAll = (result) => {
  //SELECT * FROM products
  sql.query("SELECT * FROM products", (err, res) => {
    if (err) {
      console.log("product.model.sql.js : error", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

//Get By ID
Product.getById = (productId, result) => {
  //SELECT * FROM products WHERE id = productId
  sql.query(
    `SELECT * FROM products WHERE id = ${productId}`,
    (err, res) => {
      //fail
      if (err) {
        console.log("product.model.sql.js : error", err);
        result(err, null);
        return;
      }
      //Success
      if (res.length) {
        result(null, res[0]);
        return; 
      }
      //fail
      result({ kind: "product.model.sql.js : not_found" }, null);
    }
  );
};

//Update By ID
Product.updateById = (id, params, result) => { 
  //UPDATE products SET title = "title", imagePath = "imagePath", description = "description" , price = "price", category = "category" WHERE id ="id"
  sql.query(
    "UPDATE products SET title = ?, imagePath = ?, description = ? , price = ?, category = ? WHERE id = ?",
    [params.title, params.imagePath, params.description, params.price, params.category, id],
    (err, res) => {
      //fail
      if (err) {
        console.log("product.model.sql.js : err", err);
        result(err, null);
        return;
      }
      //fail
      if (res.length == 0) {
        result({ kind: "product.model.sql.js : not_found" }, null);
        return;
      }
      //Success
      result(null, { id: id, ...params });
    }
  );
};

//Delete Product
Product.deleteById = (id, result) =>{
    //DELETE FROM products WHERE id = ?
    sql.query("DELETE FROM products WHERE id = ?", id, (err,res)=>{
      //fail
      if (err) {
        console.log("product.model.sql.js : err", err);
        result(err, null);
        return;
      }
      //fail
      if (res.length == 0) {
        result({ kind: "product.model.sql.js : not_found" }, null);
        return;
      }
      //Success
      console.log("product.model.sql.js :: Product id:" + id+ " is deleted !");
      result(null, res);
    });
}

module.exports = Product;