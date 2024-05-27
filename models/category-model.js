const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    categoryNumber:{
        type: Number,
        require: true,
    },
    category:{
        type:String,
        require:true,
    },
    categoryImage:{
        type:String,
        require:true
    }

})



const Category = new mongoose.model("Category",userSchema);
module.exports = Category;