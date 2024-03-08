const { DataTypes } = require("sequelize");
const sequelize = require("./db");

//Define the product model
const Product = sequelize.define("products", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true, // Assuming it's okay to have a product without an image
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true, // Assuming it's okay to have a product without a description
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Adjust according to your needs
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true, // Assuming it's okay to have a product without a category
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
});

//Synchronize database
// Product.sync({ force: false })
//   .then(() => {
//     console.log("Table created or already exists");
//   })
//   .catch((error) => {
//     console.error("error creating table:", error);
//   });

module.exports = Product;