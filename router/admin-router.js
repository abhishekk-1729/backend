const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin-Controller");

router.route("/addProduct").post(adminControllers.addProduct);

module.exports = router;