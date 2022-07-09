const mongoose = require('mongoose')
require('dotenv')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
    min: 5,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 5,
};


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please provide your username'],
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: 5,
        maxlength: 1024
    },
    userRole: {
        type: String,
        enum: ['USER', 'ADMIN', 'DEVELOPER'],
        default: 'USER'
    },
    isActive: { type: Boolean, default: false },
    games: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Game',
        default: null,
    },
    walletAmount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true }, { versionKey: false })


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, userRole: this.userRole, name: this.userName }, process.env.jwtPrivateKey, { expiresIn: "1d" })
    return token;
}

userSchema.methods.generateVerificationToken = function () {
    const user = this;
    const verificationToken = jwt.sign({ _id: user._id }, process.env.USER_VERIFICATION_TOKEN_SECRET, { expiresIn: "10m" });
    return verificationToken
};

const User = new mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = Joi.object({
        userName: Joi.string().alphanum().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity(complexityOptions),
        userRole: Joi.string(),
        isActive: Joi.boolean()
    })
    return schema.validate(user);
}

exports.validate = validateUser
exports.User = User
exports.userSchema = userSchema