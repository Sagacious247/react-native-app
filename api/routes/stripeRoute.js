const express = require('express')
const { createPaymentIntent } = require('../controllers/stripeController')
const router = express.Router()

router.route('/create-payment-intent').post(createPaymentIntent)

module.exports = router