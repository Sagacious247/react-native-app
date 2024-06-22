const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a user name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [6, 'Password must be atleast 8 characters'],
        select: false,
        trim: true
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"]
    },
    photo: {
       type: String,
    //    required: [true, 'Please add a photo']
       default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRD7Q19DRsBsG9YP8VVeKCwzAUv8VqE_TqdNn9aFAihZyng5IKPPouN463Kt7CW8dnag0&usqp=CAU"
    },
    phone: {
      type: String,
      default: "+234"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verified: Date,
    verificationToken: String,
    passwordChangedAt: Date,
    addresses: [
        {
        name: String,
        houseNo: String,
        landMark: String,
        street: String,
        mobileNo: String,
        city: String,
        country: String,
        postalCode: String
    }
],
    orders: {
        type: mongoose.Schema.ObjectId,
        ref: 'Orders'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.pre('save', function(next) {
    if(!this.isModified('password') || this.isNew) return next()

    this.passwordChangedAt = Date.now() - 1000
    next()
})

userSchema.pre(/^find/, function(next) {
    this.find({active: {$ne: false}})
    next()
})

userSchema.methods.correctPassword = async function(
    candidatePassword, 
    userPassword
    ) {
   return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.passwordChangedAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000, 10
        )
        return JWTTimestamp < changedTimestamp
    }
    return false
}

userSchema.methods.createPasswordResetToken = function() {
    resetToken = crypto.randomBytes(10).toString('hex')

    this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken;
}
 
module.exports = mongoose.model("User", userSchema)