const mysql = require("mysql")
const dbConfig = require("../config/db.config")

//Create DB Connection
const connection = mysql.createConnection({
  host:dbConfig.HOST,
  user:dbConfig.USER,
  password:dbConfig.PASSWORD,
  database:dbConfig.DB
});

//Connect to DB
connection.connect((error)=>{
    if(error) throw error
    console.log("db.sql.js : Successfully connected to the database ....")
})
module.exports = connection;