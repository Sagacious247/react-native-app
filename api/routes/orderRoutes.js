const express = require('express')
const { createOrder, getOrders } = require('../controllers/orderController')
const { protect } = require('../controllers/authController')
const router = express.Router()

router.route('/').post(protect, createOrder)
router.route('/:id').get(getOrders)

module.exports = router