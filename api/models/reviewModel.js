const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review can not be empty']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, 'Review must belong to a product']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, 'Review must belong to a user']
    }
}, {
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
})

reviewSchema.index({product: 1, user: 1}, { unique: true})

reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    })
    next()
})

module.exports = mongoose.model("Review", reviewSchema)