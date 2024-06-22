module.exports = {
    host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.EMAIL_PASS,
        },
}