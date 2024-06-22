const Order = require('../models/ordersModel')
const User = require('../models/userModel')
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchAsync')

// const createOrder = catchAsync(async (req, res, next) => {
//   // if(!req.body.product) req.body.product = req.params.productId;
//     if(!req.body.user) req.body.user = req.user.id

//     const {id, cartItems, shippingAddress, totalPrice, paymentMethod} = req.body

//     const products = cartItems.map((item) => ({
//        name: item?.title,
//        quantity: item.quantity,
//        price: item.price,
//        image: item?.image,
//     }))

//     const order = await Order.create({
//       user: id,
//       products: products,
//       shippingAddress: shippingAddress,
//       totalPrice: totalPrice,
//       paymentMethod: paymentMethod
//     })

//     res.status(201).json({
//       status: 'suceess',
//       data: {
//         order
//       }
//     })
// })

const createOrder = catchAsync(async (req, res, next) => {
  const { cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;
  const id = req.user.id
  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("No user found", 404))
  }
//create an array of product objects from the cart Items
const products = cartItems?.map((item) => ({
  name: item?.title,
  quantity: item.quantity,
  price: item.price,
  image: item?.image,
}));

//create a new Order
const order = await Order.create({
  user: id,
  products: products,
  totalPrice: totalPrice,
  shippingAddress: shippingAddress,
  paymentMethod: paymentMethod,
});

// await order.save();

res.status(201).json({ 
  message: "Order created successfully!",
    order
 });

})

const getOrders = catchAsync(async (req, res, next) => {
   const id = req.params.id

   const orders = await Order.find({user: id})
   if(!orders || orders.length === 0) {
    return next(new AppError("No orders found for this user", 404))
   }

   res.status(200).json({
    status: 'success',
    orders
   })
})

module.exports = {
    createOrder,
    getOrders,

}