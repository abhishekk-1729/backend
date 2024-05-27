const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async(req,res,next) => {
    const token = req.header("Authorization");
    if(!token){
        return res.status(400).json({message:"Unauthorized HTTP"});
    }

    const jwtToken = token.replace("Bearer ","").trim();
    console.log(jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY)

        const userData = await User.findOne({phone:isVerified.phone});
        console.log(userData);
        req.user = userData;
    } catch (error) {
        return res.status(401).json({message:"Unauthorized HTTP"});
    }
    next();
}

module.exports = authMiddleware;