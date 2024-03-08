const Product = require("../models/product.model");

//Insert Data
Product.createProduct = async (newProduct) => {
  try {
    const createProduct = await Product.create(newProduct);
    console.log("product.controller.js :: created product:", createProduct.toJSON());
    return createProduct.toJSON();
  } catch (error) {
    console.error("product.controller.js :: createProduct error:", error);
    throw error;
  }
};
//get all products
Product.getAll = async () => {
  try {
    const products = await Product.findAll();
    //console.log(products);
    return products.map((product) => product.toJSON());
  } catch (error) {
    console.error("product.controller.js :: getAll error:", error);
    throw error;
  }
};
//Get Product By ID
Product.getById = async (productId) => {
  try {
    //const product = await Product.findOne({ where: { id: productId } });
    const product = await Product.findByPk(productId);
    //console.log("Data ==> ",product);
    if (product) {
      // console.log(product);
      return product.toJSON();
    } else {
      throw { kind: "not_found" };
    }
  } catch (error) {
    console.log("product.controller.js :: getById error:", error);
    throw error;
  }
};
//Update a product
Product.updateById = async (id, productData) => {
  try {
    const [rowUpdated] = await Product.update(productData, {
      where: { id },
    });
    if (rowUpdated === 0) {
      throw { kind: "not_found" };
    }
    return { id: id, ...productData };
  } catch (error) {
    console.log("product.controller.js :: updateById error:", error);
    throw error;
  }
};

Product.removeById = async (id) => {
  try {
    const rowDeleted = await Product.destroy({ where: { id } });
    if(rowDeleted === 0 ){
        throw { kind: "not_found" };
    }
    return true
  } catch (error) {
    console.log("product.controller.js :: removeById error:", error);
    throw error;
  }
};
module.exports = Product;