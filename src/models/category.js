const mongoose = require('mongoose')
const Joi = require('joi')

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50,
    },
}, { versionKey: false })

const Category = new mongoose.model('Category', categorySchema)

function validateCategory(game) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required()
    })
    return schema.validate(game)
}

exports.categorySchema = categorySchema;
exports.validate = validateCategory;
exports.Category = Category;