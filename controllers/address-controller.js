const Address = require("../models/address-model")

const getAllAddressPhone = async (req,res) => {
    const phone = req.params.phone;
    const isPresent = await Address.findOne({phone:phone});
    if(isPresent){
        const res_data = await Address.find({phone:phone});
        res.status(200).json(res_data);
    }
    else{
        console.log("error");
    }

};

const addAddressPhone = async (req,res) => {
    const {phone,phoneNumber,name,address} = req.body;
    // console.log(data);
    await Address.create({phone:phone,phoneNumber:phoneNumber,name:name,address:address});
    res.status(200).json({"message":"done"});
};


const deleteAddress = async (req,res) => {
    const data = req.body;
    console.log("data",data);
    await Address.deleteOne({_id:data._id});
    res.status(200).json(data);
};

module.exports = {getAllAddressPhone,addAddressPhone,deleteAddress}

