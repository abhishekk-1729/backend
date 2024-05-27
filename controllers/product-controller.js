const { isDirty } = require("zod");
const product = require("../models/product-models");
const Category = require("../models/category-model");
const SubCategory = require("../models/subCategory-model");

const getAllProducts = async(req,res) =>{
    try {
        const products = await product.find();
        if(!products){
            res.status(404).json({"message":"no product found"});
        }
        // console.log(products)
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
}

const addProduct = async(req,res) =>{
    try {
        const products = req.body;
        for (const item of products) {
        const {category,subCategory,productName,quantity,price,location} = item;

        let id1 = 0;
        let id2 = 0;
        
        try {
            const categoryName = await Category.findOne({ category: category });
            if (!categoryName) {
                const last = await Category.countDocuments() + 1;
                await Category.create({ categoryNumber: last, category: category });
                id1 = last;
            } else {
                id1 = categoryName.categoryNumber;
            }
        
            const subCategoryName = await SubCategory.findOne({ subCategory: subCategory });
            if (!subCategoryName) {
                const last2 = await SubCategory.countDocuments() + 1;
                await SubCategory.create({ subCategoryNumber: last2, subCategory: subCategory });
                id2 = last2;
            } else {
                id2 = subCategoryName.subCategoryNumber;
            }
        
        } catch (error) {
            console.error('Error processing categories:', error);
            
        }
        
        const temp = await product.countDocuments()+1;

        let categoryStr = id1.toString().padStart(2, '0');
        let subCategoryStr = id2.toString().padStart(2, '0');
        let productCountStr = temp.toString().padStart(3, '0');
        let productInitials = productName.replace(/[^a-zA-Z]/g, '').substring(0, 2).toUpperCase();
        
        console.log(productInitials);
        let productId = categoryStr + subCategoryStr + productCountStr + productInitials;
        let imageName = productId+".png"

        await product.create({productId:productId,productImage:imageName,category:category,	subCategory:subCategory	,productName:productName,productCount:temp,	quantity:quantity	,price:price,	location:location});

        
    }
    res.status(200).json({"message":"done"});
    } catch (error) {
        console.log(error);
    }

}




const getAllProductsById = async(req,res) =>{
    try {
        const id = req.params.id;
        
        if(id){
            const idArray = id.split(",");
            // console.log(idArray);
            res.json(await product.find({"_id":{$in:idArray}}))
        }
        else{
            res.json(await product.find());
        }

    } catch (error) {
        console.log(error);
    }
}


module.exports = {getAllProducts,getAllProductsById,addProduct}