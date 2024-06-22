const express = require('express')
const { createReview, getAllReviews, getReview, deleteReview, updateReview } = require('../controllers/reviewController')
const { restrictTo, protect } = require('../controllers/authController')
const router = express.Router({ mergeParams: true })

router.route('/')
.post(protect, restrictTo('user'), createReview)
.get(getAllReviews)

router.route('/:id')
.get(getReview)
.delete(deleteReview)
.patch(updateReview)

module.exports = router