


const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const crypto = require('crypto')
const AppError = require('../utility/appError')
const catchAsync = require('../utility/catchAsync')
const { promisify } = require('util')
const nodemailer = require('nodemailer')
// const sendVerificationEmail = require('../utility/sendVerificationEmail')

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN *24 * 60 * 60 * 1000 
                ),
                httpOnly: true
    }

    if(process.env.NODE_ENV === "production") cookieOptions.secure = true

    res.cookie("jwt", token, cookieOptions)

    user.password = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        data: { 
            user
        }
    })
}

const sendVerificationEmail = async( email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })

    // const message = `Please copy your verification code here : ${verificationToken}`
    const message = `Please copy your verification token here : 
    http://localhost:3000/verify-email?token=${verificationToken}&email=${email}`

    const mailOptions = {
        from: "e-shop.com",
        to: email,
        subject: "Email Verification",
        text: `${message}`
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log("Error sending verification email", error)
    }
}

const resetPasswordEmail = async(options) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: "e-shop.com",
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOptions)

}

const signup = catchAsync(async (req, res, next) => {
    const {name, email, password} = req.body
    const existingUser = await User.findOne({email})
    if(existingUser) {
        return next(new AppError("Email already exist, Please try anothter email"))
    }

    const isFirstAccount = await User.countDocuments({}) === 0
    const role = isFirstAccount ? "admin" : "user"

    const verificationToken = crypto.randomBytes(12).toString('hex')

    const newUser = await User.create({
        name,
        email,
        password,
        role,
        verificationToken
    })

    sendVerificationEmail(newUser.email, newUser.verificationToken)

    res.status(201).json({
        status: 'success',
        message: 'Please check your email to verify account'
    })
})


const verifyEmail = async (req, res, next) => {
    const {verificationToken, email} = req.body

    const user = await User.findOne({email})
    if(!user) {
        return next(new AppError("Invalid Verfication token", 401))
    }

    if(user.verificationToken  !== verificationToken) {
        return next(new AppError("Invalid Verfication token"))
    }

    user.isVerified = true;
    user.verified = Date.now()
    user.verificationToken = undefined

    await user.save()

    res.status(200).json({
         status: 'success',
         message: "Email verified successfully!"
      })

    // try {
    //     const token = req.params.token
    
    //      const user = await User.findOne({verificationToken: token}) 
    //      if(!user) {
    //         return next(new AppError("Invalid Verfication token"))
    //      }
    
    //      user.verify = true;
    //      user.verificationToken = undefined
    
    //      await user.save()
    
    //      res.status(200).json({
    //         status: 'success',
    //         message: "Email verified successfully!"
    //      })
    // } catch (error) {
    //     res.status(500).json({
    //         message: 'Email verification Failed'
    //     })
    // }
   
}

const login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body
    if(!email || !password) {
        return next(new AppError("Please provide email and password"))
    }

    const user = await User.findOne({email}).select('+password')
    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Invalid email or password"))
    }

    if(!user.isVerified) {
        return next(new AppError("Plerase verify your email"))
    }

    // const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
    //     expiresIn: process.env.JWT_EXPIRES_IN
    // })

    createSendToken(user, 200, res)
    // res.status(200).json({token})
})

const logout = catchAsync(async (req, res, next) => {
   res.cookie('jwt', 'Loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
   })
   res.status(200).json({
    status: 'success'
   })
})

const protect = catchAsync(async (req, res, next) => {
    let token
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
        ) {
        token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt
    }

    if(!token) {
        return next(new AppError("You are not logged in! Please log in to get access", 401))
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET )

    const currentUser = await User.findById(decoded.id)
    if(!currentUser) {
        return next(new AppError("The user belonging to the token does no longer exist", 401))
    }

    if(currentUser.passwordChangedAfter(decoded.iat)) {
        return next(new AppError("User recently changed password"))
    }

    req.user = currentUser;
    next();
})

// Get Logging status
const isLoggedIn = async (req, res, next) => {

   if(req.cookies.jwt) {
    try {
        const decoded = await promisify(jwt.verify)(
            res.cookies.jwt,
            process.env.JWT_SECRET
        );
    
        const currentUser = await User.findById(decoded.id) 
        if(!currentUser) {
            return next()
        }
    
        if(currentUser.passwordChangedAfter(decoded.iat)) {
            return next()
        }
    
        res.locals.user = currentUser
        return next()
    } catch (error) {
        return next()
    }
   }
   next()
}

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
          return next(new AppError("You do not have permission to perform this operation", 403))
        }
        next()
    }
}

const forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})
    if(!user) {
        return next(new AppError('There is no user with this email address', 404))
    }

   const resetToken = user.createPasswordResetToken()
    await user.save({validateBeforeSave: false})

    const resetURL = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/resetPassword/${resetToken}`

    const message = `Forgot your password? Submit a PATCH request with your new password to : ${resetURL}
    .\nIf you did not forget your password, please ignore this email.`

    try {
        await resetPasswordEmail({
          email: user.email,
          subject: 'Your password reset token is valid for 10 min',
          message
        })
        res.status(200).json({
          status: 'success',
          message: 'Token sent to email'
        }) 
    } catch (error) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({validateBeforeSave: false})

        return next(new AppError('There was an error send the email, Try again later', 500))
    }

})

const resetPassword = catchAsync(async (req, res, next) => {
   const resetToken = crypto
   .createHash('sha256')
   .update(req.params.token)
   .digest('hex')

   const user = await User.findOne({
    passwordResetToken: resetToken, 
    passwordResetExpires: {$gt: Date.now()}
})
if(!user) {
    return next(new AppError('Token is invalid or has expired', 400))
}

user.password = req.body.password;
user.passwordResetToken = undefined;
user.passwordResetExpires = undefined
await user.save()

const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
})

res.status(200).json({
    status: 'success',
    token
})
})

const updatePassword = catchAsync(async (req, res, next) => {
    // const userId = req.params.userId
    
    const user = await User.findById(req.user.id).select('+password')
    if(!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Your current password is incorrect', 401))
    }
    
    user.password = req.body.password;
    await user.save()

    createSendToken(user, 200, res)
})

module.exports = {
    signup,
    verifyEmail,
    login,
    protect,
    restrictTo,
    logout,
    isLoggedIn,
    updatePassword,
    forgotPassword,
    resetPassword
}