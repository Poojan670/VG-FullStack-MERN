const mongoose = require('mongoose')
const Joi = require('joi')
const { userSchema } = require('./users')

const userDetailsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 10,
        required: [true, 'First Name is required']
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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of Birth is required'],
        trim: true
    },
    age: {
        type: Number,
        min: 10,
        max: 99
    }
}, { timestamps: true }, { versionKey: false })

userDetailsSchema.pre("save", function (next) {
    var birthday = this.dateOfBirth.getFullYear()
    var d = new Date()
    let current_date = d.getFullYear()
    let age = current_date - birthday
    this.age = age
    next();
})

const UserDetails = new mongoose.model('UserDetails', userDetailsSchema)

function validateUserDetails(UserDetails) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).required(),
        middleName: Joi.string().min(3).max(50),
        lastName: Joi.string().min(3).max(50).required(),
        userId: Joi.objectId().required(),
        dateOfBirth: Joi.date().required(),
    })
    return schema.validate(UserDetails);
}

exports.userDetailsSchema = userDetailsSchema
exports.validate = validateUserDetails
exports.UserDetails = UserDetails