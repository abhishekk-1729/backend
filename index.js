require("dotenv").config();
const express = require("express")
const cors = require("cors")
const productRoute = require("./router/product-router")
const checkOut = require("./router/checkout-router.js")
const product = require("./router/product-router.js")
const app = express();
const connectDb = require("./utils/db");
const PORT =  process.env.PORT;

app.use(cors());
app.use(express.json())

app.use("/api/products",productRoute);
// app.use("/api/checkout",checkOut);
app.use("/api/product",product);

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running at ${PORT}`);
    })
})