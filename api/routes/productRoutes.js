const express = require('express')
const { createProduct, getAllProducts, getProduct, deleteProduct, updateProduct } = require('../controllers/productsController')
const reviewRouter = require('../routes/reviewRoutes')
const { protect, restrictTo } = require('../controllers/authController')
const router = express.Router()


router.route('/')
.post(protect, restrictTo("admin"), createProduct)
.get(getAllProducts)

router.route('/:id')
.get(getProduct)
.patch(protect, restrictTo('admin'), updateProduct)
.delete(protect, restrictTo('admin'), deleteProduct)

router.use('/:productId/reviews', reviewRouter)

module.exports = router