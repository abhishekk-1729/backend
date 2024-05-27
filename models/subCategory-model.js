const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    subCategoryNumber:{
        type: Number,
        require: true,
    },
    subCategory:{
        type:String,
        require:true,
    },
    subCategoryImage:{
        type:String,
        require:true
    }

})



const SubCategory = new mongoose.model("SubCategory",userSchema);
module.exports = SubCategory;