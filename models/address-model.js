const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    }
})

// userSchema.methods.generateToken = async function(){
//     try {
//         return jwt.sign(
//             {
                
//                 phone: this.phone,

//             },
//             process.env.JWT_SECRET_KEY,
//             {
//                 expiresIn:"3d"
//             }

//         )
//     } catch (error) {
//         console.error(error);
//     }
// }

const Address = new mongoose.model("Address",userSchema);

module.exports = Address;