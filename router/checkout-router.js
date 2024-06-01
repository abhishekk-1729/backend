const express = require("express")
const router = express.Router();
const product = require("../models/product-models");
const Order = require("../models/order-model");
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = 'https://blinkit-frontend-livid.vercel.app';

router.route("/final").post(async (req, res) => {
    
  try {
    console.log("hiiii",req.body);
    const {time,address,phone} = req.body;
    const productsIds = req.body.products.split(',');
    const uniqIds = [...new Set(productsIds)];
    const products = await product.find({_id:{$in:uniqIds}});
    let line_items = [];
    const x = await await Order.distinct('orderId')+1;
    for (let productId of uniqIds) {
      const quantity = productsIds.filter(id => id === productId).length;
      const product = products.find(p => p._id.toString() === productId);
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: {name:product.productName},
          unit_amount: product.price * 100,
        },
      });
      
      await Order.create({
        orderId: x,
        timeOfOrder:time,
        phone:phone,
        modeOfPayment:"CARD",
        addressId:address,
        productId:product._id,
        baseQuantity:product.quantity,
        units: quantity,
        orderStatus:"Initiated",
        amount:product.price
      });

    } 
    

    
    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        customer_email: "abhikriitd@gmail.com",
        success_url: `${YOUR_DOMAIN}/success/${x}`,
        cancel_url: `${YOUR_DOMAIN}/cancel`,
    });

    console.log(session);
    res.status(200).json({ url: session.url });
    
  
  }
    catch (error) {
      console.log("hi");
    }

  });


module.exports = router;