const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    orderId:{
        type:String,
        require:true
    },
    timeOfOrder:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    modeOfPayment:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    productId:{
        type:String,
        require:true
    },
    baseQuantity:{
        type:String,
        require:true
    },
    units:{
        type:String,
        require:true
    },
})

const Order = new mongoose.model("Order",userSchema);
module.exports = Order;