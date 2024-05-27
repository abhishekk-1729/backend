const express = require("express")
const router = express.Router();
const {loginPhone,user} = require("../controllers/auth-controller.js");
const authMiddleware = require("../middlewares/auth-middleware.js");


router.route("/loginPhone").post(loginPhone)

router.route("/user").get(authMiddleware,user);

module.exports = router;

// DKC1XY3G4TU47Z5F1SSNLNF8