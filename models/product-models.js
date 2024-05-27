const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    category: {
        type: String, // Changed to Number
        required: true
    },
    subCategory: {
        type: String, // Changed to Number
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productCount: {
        type: Number, // Changed to Number
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    price: {
        type: Number, // Changed to Number
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
