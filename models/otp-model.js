const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userPhone:{
        type: Number,
        require: true,
    },
    otp:{
        type:String,
        require:true,
    }

})



const Otp = new mongoose.model("Otp",userSchema);
module.exports = Otp;