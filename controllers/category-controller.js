const Category = require("../models/category-model");
const SubCategory = require("../models/subCategory-model");

const addCategory = async(req,res) =>{
    try {
        const categories = req.body;
        const initialCount = await Category.countDocuments();

        categories.forEach((item, index) => {
            const temp = initialCount + index + 1;
            const image = `${temp}.img`;
            Category.create({ category: item.category, categoryImage: image, categoryNumber: temp });
        });

        res.status(200).json({"message":"done"});       
    } catch (error) {
        console.log(error);
    }

}


const getAllCategory = async(req,res) =>{
    try {
        
        const products = await Category.find();
        
        if(!products){
            res.status(404).json({"message":"no product found"});
        }
        console.log(products)
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
}

const addSubCategory = async(req,res) =>{
    try {
        const categories = req.body;

        const initialCount = await SubCategory.countDocuments();

        categories.forEach((item, index) => {
            const temp = initialCount + index + 1;
            const image = `${temp}.img`;
            SubCategory.create({ subCategory: item.subCategory, subCategoryImage: image, subCategoryNumber: temp });
        });
        res.status(200).json({"message":"done"});       
    } catch (error) {
        console.log(error);
    }

}

module.exports = {addCategory,addSubCategory,getAllCategory}