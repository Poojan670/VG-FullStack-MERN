const nodemailer = require('nodemailer');
require('dotenv')

const transporter = nodemailer.createTransport({
    // host: 'smtp.live.com',
    service: "gmail",
    // port: 587,
    // secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

exports.mail = transporter