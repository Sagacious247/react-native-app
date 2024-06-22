const User = require('../models/userModel')
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchAsync')

const filterObj = (obj, ...allowedFields) => {
    const newObj = {}
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el]
    })
    return newObj
}

const updateMe = catchAsync(async (req, res, next) => {
    // const userId = req.params.userId
    if(req.body.password) {
        return next(new AppError('This route is not for password update. Please use /updateMyPassword', 400))
    }

    const filteredBody = filterObj(req.body, 'name', 'email', "phone",)
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: 'success',
        data: {
           user: updatedUser
        }
    })
})

const deleteMe = catchAsync(async (req, res, next) => {
    // const userId = req.params.userId
    await User.findByIdAndUpdate(req.user.id, {active: false})

    res.status(204).json({
        status: 'success',
        data: null
    })
})


const getProfile = catchAsync(async (req, res, next) => {
    
   const user = await User.findById(req.user.id)
   if(!user) {
    return next(new AppError("No user found with this ID", 404))
   }

   res.status(200).json({
    status: 'success',
    data: {
        user
    }
   })
})


const getAllUser = catchAsync(async (req, res, next) => {
    const users = await User.find()
    if(!users) {
        return next(new AppError("No users found", 404))
    }

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    })
})

const createAddresses = catchAsync(async (req, res, next) => {
    const { address} = req.body

    const user = await User.findById(req.user.id)
    if(!user) {
        return next(new AppError("No user found with this ID", 404))
    }

     user.addresses.push(address)
     await user.save()

    res.status(200).json({
        status: 'success',
        message: "Address created successfully!"
    })
})


const getAddress = catchAsync(async (req, res, next) => {

  const user = await User.findById(req.user.id)
  if(!user) {
    return next(new AppError("Cant find user with this ID", 404))
  }

  const addresses = user.addresses

  res.status(200).json({
    status: 'success',
    results: addresses.length,
    addresses
  })
})

module.exports = {
    getAllUser,
    getProfile,
    updateMe,
    deleteMe,
    createAddresses,
    getAddress
}