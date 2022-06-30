const nodemailer = require('nodemailer');
require('dotenv')

const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

exports.mail = transporter