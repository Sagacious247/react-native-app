const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const Order = require('../models/ordersModel')
const User = require('../models/userModel')

const createPaymentIntent = async (req, res) => {
    try {
        // const order = await Order.find(req.body.totalPrice)
    //     const { cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;
    //     const id = req.user.id
    //     const user = await User.findById(id);
    //     if (!user) {
    //       return next(new AppError("No user found", 404))
    //     }
    //   //create an array of product objects from the cart Items
    //   const products = cartItems?.map((item) => ({
    //     name: item?.title,
    //     quantity: item.quantity,
    //     price: item.price,
    //     image: item?.image,
    //   }));
      
      //create a new Order
      const order = await Order.find({
        user: req.body.id,
        products: req.body.products,
        totalPrice: req.body.totalPrice,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
      });

        const paymentItent = await stripe.paymentItents.create({
            amount: order,
            currency: 'usd',
            payment_method_types: ['card']
        })
        const clientSecret = paymentItent.client_secret;

        res.status(201).json({
            status: 'success',
            clientSecret: clientSecret,
        })
    } catch (error) {
        console.log(error.message)
        res.json(error.message)
    }
}

module.exports = {
    createPaymentIntent
}