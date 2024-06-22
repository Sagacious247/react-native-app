const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product must have a title"]
    },
    image: {
        type: String,
        required: [true, "Product must have an image"]
    },
    description: {
        type: String,
        required: [true, "Product must have a decription"]
    },
    category: {
      type: String,
      enum: [ "Phone", "Fashion", "Electronics", "Laptop"]
    },
    price: {
        type: Number,
        required: [true, "Provide must have a price"]
    }, 
    rating: {
        type: Number,
        rate: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    quantity: {
        type: Number,
        default: 1,
    }
}, {
    toJSON: { virtuals: true },
    toObject: {virtuals: true }
})

productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
})

module.exports = mongoose.model("Product", productSchema)