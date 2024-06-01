const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// phone, all sub categories
const userSchema = new mongoose.Schema({
    phone:{
        type: String,
        require: true
    },

    isAdmin:{
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign(
            {
                
                phone: this.phone,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"3d"
            }

        )
    } catch (error) {
        console.error(error);
    }
}

const User = new mongoose.model("User", userSchema);
module.exports = User