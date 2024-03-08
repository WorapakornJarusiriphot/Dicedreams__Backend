const {Sequelize} = require("sequelize");
const dbConfig = require("../config/db.config");

//Create sequalize instance
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
  host:dbConfig.HOST,
  dialect: "mariadb",
dialectOptions: {
  ssl: {
    require: true,
    rejectUnauthorized: false, 
  },
},
});

//Test the database connection
async function testConnection(){
    try {
      await sequelize.authenticate();
      console.log("db.js : Connection has been established successfully.");
      console.log("db.js : Connection has been established by PU");
    } catch (error) {
      console.error("db.js : Unable to connect to the database:", error);
    }
}

testConnection();
module.exports = sequelize;