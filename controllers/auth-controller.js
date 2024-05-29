const accountSid = "ACc51ce0a3c2bb2659ff3a0a5d0c445f78";
const authToken = "a05d32e268e19cdc5cbaa88dfb114f84"
const User = require("../models/user-model")
const jwt = require("jsonwebtoken")
const Otp = require("../models/otp-model")

const client = require("twilio")(accountSid,authToken)

let OTP, user1;
const loginPhone = async (req,res) => {
    const data = req.body.phone;
    const isPresent = await User.findOne({phone:data});
    let digits = "0123456789";
    let OTP="";
    for(let i=0;i<4;i++){
        OTP+=digits[Math.floor(Math.random()*10)];
    }
    if(isPresent){
        
        try {
            const message = await client.messages.create({
              body:    `${OTP}`,
              from: 'whatsapp:+14155238886',
              to: `whatsapp:+91${data}`
            });
            // console.log(message.sid);
            // console.log(OTP);
            res.status(201).json({"result":"true","otp":OTP,token: await isPresent.generateToken()})
          } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Failed to send message' });
          }
          
    }


    else{
        console.log("not found");
        await User.create({phone:data});
        // console.log("created")
        try {
            const message = await client.messages.create({
              body:    `${OTP}`,
              from: 'whatsapp:+14155238886',
              to: `whatsapp:+91${data}`
            });
            // console.log(message.sid);
            res.status(201).json({"result":"true","otp":OTP,token: await isPresent2.generateToken()})
          } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Failed to send message' });
          }
        const isPresent2 = await User.findOne({phone:data});
        
        

    }
    
    
}

// const verify = async (req,res) => {
//     try {
//         console.log(req.body);
//         const {phone,otp} = req.body;

//         if(otp!=OTP){
//             return res.status(400).json({msg:"Incorrect Otp"});
//         }

//         user1 = await user1.save();
//         const token = jwt.sign({id:user._id},"password key");
//         res.status(200).json({token,...user._doc});
//         OTP="";
//     } catch (error) {
//         console.log(error);
//     }
// }


const user = async(req,res) => {
    try {
        const userData = req.user.phone;
        return res.status(200).json({userData});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {loginPhone,user}

