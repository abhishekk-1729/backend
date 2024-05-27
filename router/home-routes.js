const express = require("express")
const {homeView,generatePdf} = require("../controllers/homeController")

const router = express.Router();

router.route("/home/:id").get(homeView);
router.route("/download/:id").get(generatePdf);

module.exports = router;