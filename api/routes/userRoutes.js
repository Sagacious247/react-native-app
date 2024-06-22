const express = require('express')
const { 
    signup, 
    login, 
    verifyEmail, 
    protect, 
    restrictTo, 
    logout, 
    updatePassword,
    forgotPassword,
    resetPassword,
    isLoggedIn} = require('../controllers/authController')
const { getAllUser, getProfile, updateMe, deleteMe, createAddresses, getAddress } = require('../controllers/userController')
const router = express.Router()

router.use(isLoggedIn)

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:token').patch(resetPassword)
router.route('/verify-email').post(verifyEmail)

router.use(protect)

router.route('/logout').get( logout)
router.route('/updateMyPassword').patch( updatePassword)
router.route('/profile').get( getProfile)
router.route('/updateMe').patch( updateMe)
router.route('/deleteMe').delete( deleteMe)

router.route('/addresses').post( createAddresses)
router.route('/addresses/:id').get( getAddress)

router.route('/')
.get(
    restrictTo('admin'), 
    getAllUser
)

module.exports = router