const Product = require("../models/product-models")
const ProductUnit = require("../models/productUnit-model")

const addProduct = async(req,res) => {

    try {
        const {productName, type, keyFeatures, Ingredients, shelfLife, countyOfOrigin, fssaiLicense, customerCareDetails, returnPolicy, expiryDate, netWeight, packagingType, seller, sellerFSSAI, description, disclaimer, category, subCategory, quantityType, baseQuantity, productId, addressProduct, availableQuantity} = req.body;

        const createProduct = await Product.create({productName, type, keyFeatures, Ingredients, shelfLife, countyOfOrigin, fssaiLicense, customerCareDetails, returnPolicy, expiryDate, netWeight, packagingType, seller, sellerFSSAI, description, disclaimer, category, subCategory, quantityType, baseQuantity, productId, addressProduct, availableQuantity});

        return res.status(201).json({message:"created"});

        console.log({"message":"hi"})
    } catch (error) {
        console.log(error);
    }
}

const editProductById = (req,res) => {

    try {
        
        res.status(200).send({"message":"Products fetched succesfully"});
        console.log({"message":"hi"})
    } catch (error) {
        console.log(error);
    }
}

const deleteProductById = (req,res) => {

    try {
        res.status(200).send({"message":"Products fetched succesfully"});
        console.log({"message":"hi"})
    } catch (error) {
        console.log(error);
    }
}

module.exports = {addProduct,editProductById,deleteProductById}