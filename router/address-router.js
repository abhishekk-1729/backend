const express = require("express")
const router = express.Router();
const {getAllAddressPhone,addAddressPhone,deleteAddress} = require("../controllers/address-controller");
const authMiddleware = require("../middlewares/auth-middleware.js");


router.route("/getAddressPhone/:phone").get(getAllAddressPhone);
router.route("/addAddressPhone").post(addAddressPhone);
router.route("/deleteAddress").delete(deleteAddress);


module.exports = router;

