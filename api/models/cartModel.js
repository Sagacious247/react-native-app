const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: [true, 'Cart item must belong to a user']
    },
    products: [
        {
            cartItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ],
})

cartSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'products.cartItem',
        select: "_id title price, image"
    }).populate({
        path: 'user',
        select: 'name'
    })
    next()
})

module.exports = mongoose.model("Cart", cartSchema)