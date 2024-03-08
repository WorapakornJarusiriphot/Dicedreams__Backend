const express = require("express");
const cors = require("cors");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");
const sql = require("./models/db");
const PORT = 1000
const productRouter = require("./routes/product.router")
const req = require("express/lib/request");
const db = require("./models/index");
const role = db.role;
//dev mode
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and resync DB");
  initial();
});

function initial() {
  role.create({
    id: 1,
    name: "user",
  });
  role.create({
    id: 2,
    name: "moderator",
  });
  role.create({
    id: 3,
    name: "admin",
  });
}

//1. Create app
const app = express()

//2. Setting middleware //MiddLeware เป็นซอฟต์แวร์ที่อยู่ระหว่างกลาง
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Swagger Doc
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//3. Router //เป็นตัวจัดการกับ Router
app.get("/", (req, res)=>{
    res.send("<h1>This is a product API</h1>")
})

//Use product router
app.use("/api", productRouter);
app.use("/",productRouter)
require("./routes/auth.router")(app);

//4. Running app
app.listen(PORT, ()=>{
    console.log("app listening at http://localhost:"+PORT+" ...");
})