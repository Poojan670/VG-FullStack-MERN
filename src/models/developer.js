const mongoose = require('mongoose')
const Joi = require('joi')

const developerSchema = new mongoose.Schema({
    devName: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    bio: String,
    website: String,
}, { versionKey: false }
)

const Developer = new mongoose.model('Developer', developerSchema)

function validateDeveloper(game) {
    const schema = Joi.object({
        devName: Joi.string().alphanum().min(3).max(50).required(),
        bio: Joi.string().min(10),
        website: Joi.string()
    })
    return schema.validate(game)
}

exports.developerSchema = developerSchema
exports.Developer = Developer
exports.validate = validateDeveloper