const { isDirty } = require("zod");
const product = require("../models/product-models");
const Category = require("../models/category-model");
const SubCategory = require("../models/subCategory-model");

// const {leven} =  require('leven');
const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: "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",
});

const chatGptExecute= async (userQuery) => {
    const completion = await openai.chat.completions.create({
        model: "ft:gpt-3.5-turbo-0125:personal::9VDkIHDS:ckpt-step-80",
        messages: [
            {
                "role": "system",
                "content": [
                    {
                        "type": "text",
                        "text": "You are an AI assistant that helps in converting a natural language list of items into a structured JSON format. Given an input text that describes an order of products and their quantities, you should output a JSON array where each object contains the product name and its quantity. If the quantity is not mentioned, assume it to be 1."
                    }
                ]
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": userQuery
                    }
                ]
            }
        ]
    });

    console.log(completion.choices[0]);
    if (completion.choices.length > 0) {
        const actualResult = JSON.parse(completion.choices[0].message.content);
        console.log(actualResult);
        return actualResult;
        
    } else {
        console.log("No response from the model.");
    }
}

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
        
        console.log(productName);
        let productId = categoryStr + subCategoryStr + productCountStr + productInitials;
        let imageName = temp.toString()+".png"

        await product.create({categoryNumber: id1, subCategoryNumber:id2, productId:productId,productImage:imageName,category:category,	subCategory:subCategory	,productName:productName,productCount:temp,	quantity:quantity	,price:price,	location:location});

        
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


const getAllProductsByQuery = async(req,res) =>{
    try {
        
        const query = req.params.query;
       console.log(query);
        const queryParsed = await chatGptExecute(query);
        console.log(queryParsed);
        const ans=[];
        for(const q of queryParsed){
            const p = q.product;
            const n = q.quantity;

            console.log(p);
            // const partialMatchProducts = await product.find({
            //     productName: { $regex: p, $options: 'i' },
            // }).limit(10);

            // // console.log(partialMatchProducts);

            // if(partialMatchProducts.length>0)
            const products = await product.find();

            // Define a threshold for similarity score (adjust as needed)
            const similarityThreshold = 0.1;
    
            // Find matching products based on similarity score
            const matchingProducts = products.filter(product => {
                const productNameTokens = product.productName.toLowerCase().split(' ');
                const queryTokens = p.split(' ');
    
                // Calculate similarity score based on matching tokens
                const matchingTokenCount = queryTokens.reduce((count, token) => {
                    if (productNameTokens.includes(token)) {
                        return count + 1;
                    }
                    return count;
                }, 0);
    
                const similarityScore = matchingTokenCount / queryTokens.length;
                // console.log(matchingTokenCount);
                return similarityScore >= similarityThreshold;
            });

            if(matchingProducts.length>0)
            ans.push({ productName: matchingProducts[0]._id, quantity: n });

        }
        res.status(200).json(ans);
        
    } catch (error) {
        console.log(error);
    }
}




module.exports = {getAllProducts,getAllProductsById,addProduct,getAllProductsByQuery}