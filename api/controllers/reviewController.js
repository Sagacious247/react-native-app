const Review = require('../models/reviewModel');
const AppError = require('../utility/appError');
const catchAsync = require('../utility/catchAsync')

const createReview = catchAsync(async (req, res, next) => {
    if(!req.body.product) req.body.product = req.params.productId;
    if(!req.body.user) req.body.user = req.user.id
 
    const review = await Review.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            review
        }
    })
})

const getAllReviews = catchAsync(async (req, res, next) => {
    let filter = {};
    if(req.params.productId) filter = {product: req.params.productId}
    const reviews = await Review.find(filter)

    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: {
            review: reviews
        }
    })
})

const getReview = catchAsync(async (req, res, next) => {
    const review = await Review.findById(req.params.id)
    if(!review) {
        return next(new AppError("There is no review with this ID", 404))
        }

        res.status(200).json({
            status: 'success',
            data: {
                review
            }
        })
})

const updateReview = catchAsync(async (req, res, next) => {
    const updatetReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if(!updatetReview) {
        return next(new AppError("There is no review with this ID", 404))
        }

        res.status(200).json({
            status: 'success',
            data: {
                review: updatetReview
            }
        })
})

const deleteReview = catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id)
    if(!review) {
        return next(new AppError("There is no review with this ID", 404))
        }

        res.status(200).json({
            status: 'success',
            data: null
        })
})

module.exports = {
    createReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview
}