const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    }
})

const Address = new mongoose.model("Address",userSchema);

module.exports = Address;