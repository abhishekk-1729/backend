const express = require("express")
const {editOrderById,getAllOrdersPhone} = require("../controllers/order-controller")

const router = express.Router();

router.route("/edit/:orderId").put(editOrderById);
router.route("/getAllOrdersPhone/:phone").get(getAllOrdersPhone);


module.exports = router;