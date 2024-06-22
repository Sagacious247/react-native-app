const sendEmail = require("./email")

const sendVerificationEmail = async ({ name, email, verificationToken}) => {

    const verifyEmail = `${req.protocol}//${req.get('host')}/api/v1/users/verify-email?token=${verificationToken}&email=${email}`

    const message = `Please confirm your email by clicking on the follwing link : 
    <a href="${verifyEmail}">Verify Email</a>`

    return sendEmail({
        to: email,
        subject: "Verification Email",
        html:   `<h4>Hello, ${name}</h4> ${message}`
    })
}

module.exports = sendVerificationEmail