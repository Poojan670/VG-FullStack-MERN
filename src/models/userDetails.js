const mongoose = require('mongoose')
const Joi = require('joi')
const { userSchema } = require('./users')

const UserDetails = new mongoose.model('UserDetails', new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 10,
        required: true
    },
    middleName: {
        type: String,
        minlength: 3,
        maxlength: 10
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 10
    },
    userPhoto: {
        data: Buffer,
        contentType: String
    }


}, { timestamps: true }, { versionKey: false })
)