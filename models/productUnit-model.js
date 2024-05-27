const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    unit:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    discount:{
        type:String,
        require:true
    },
    productId:{
        type:String,
        require:true
    },
})

const ProductUnit = new mongoose.model("ProductUnit", userSchema);
module.exports = ProductUnit