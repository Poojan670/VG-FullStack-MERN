const mongoose = require('mongoose')
const Joi = require('joi')

const addMoneyToWalletSchema = new mongoose.Schema({
    pay_type: {
        type: String,
        enum: ['CASH', 'CREDIT'],
        default: 'CASH'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        min: 5,
        max: 999999999,
        required: true
    },
    remarks: {
        type: String,
        minlength: 5,
        maxlength: 255
    },
}, { timestamps: true }, { versionKey: false })

const Wallet = new mongoose.model('Wallet', addMoneyToWalletSchema)

function validateWallet(wallet) {
    const schema = Joi.object({
        pay_type: Joi.string().required(),
        remarks: Joi.string().required(),
        user: Joi.objectId().min(5).max(255).required(),
        amount: Joi.number().min(5).max(999999999).required()
    })
    return schema.validate(wallet)
}

exports.validate = validateWallet
exports.Wallet = Wallet