
const User = require("../models/user-model")
// const jwt = require("jsonwebtoken")

const client = require("twilio")(accountSid,authToken)

const loginPhone = async (req,res) => {
    const data = req.body.phone;
    const isPresent = await User.findOne({phone:data});
    let digits = "0123456789";
    let OTP="";
    for(let i=0;i<4;i++){
        OTP+=digits[Math.floor(Math.random()*10)];
    }

    console.log(data);
    if(isPresent){
        console.log("found")
        res.status(200).json({"result":"true","otp":OTP,token: await isPresent.generateToken()})
    }
    else{
        console.log("not found");
        await User.create({phone:data});
        console.log("created")
        const isPresent2 = await User.findOne({phone:data});
        res.status(201).json({"result":"false","otp":OTP,token: await isPresent2.generateToken()})

    }

    // await client.messages.create({
    //     body:`Your otp verification for phone number ${data} is ${OTP}`,
    //     messagingServiceSid:"",
    //     to:"+918755273773"

    // })
    // .then(()=>res.status(200).json({msg:"Message Sent"}))
    

    
}

const user = async(req,res) => {
    try {
        const userData = req.user.phone;
        return res.status(200).json({userData});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {loginPhone,user}

