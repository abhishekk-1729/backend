const express = require("express")
const router = express.Router();
const {getAllProducts,getAllProductsById,addProduct} = require("../controllers/product-controller")
const {addCategory,addSubCategory} = require("../controllers/category-controller")

router.route("/getAllProducts").get(getAllProducts);
router.route("/addProduct").post(addProduct);
router.route("/addCategory").post(addCategory);
router.route("/addSubCategory").post(addSubCategory);
router.route("/getAllProductsById/:id").get(getAllProductsById);

module.exports = router;