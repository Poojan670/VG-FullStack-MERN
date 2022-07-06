require('dotenv').config();
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const Joi = require('joi')
const { User } = require('../models/users')
const { validPassword } = require('../utils/hash')

function validate(auth) {
    const schema = Joi.object({
        userName: Joi.string().min(5).max(50),
        email: Joi.string().min(5).max(255).email(),
        password: Joi.string().required(),
    }).or('email', 'password')
    return schema.validate(auth);
}

const login = async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let userName = req.body.userName,
        password = req.body.password,
        email = req.body.email;

    if ((!!email && !!userName) || (!email && !userName)) {
        return res.status(400).json({ "msg": "Please provide either userName or email" })
    }

    let user = await User.findOne({
        $or: [
            { email: email },
            { userName: userName }
        ]
    });
    if (!user) return res.status(404).json({ "msg": "User Does not exist!" })

    const passwordValidate = await validPassword(password, user.password)
    if (!passwordValidate) {
        return res.status(400).json({ "msg": "Invalid username/email or password" })
    }

    if (!user.isActive) {
        return res.status(403).json({ "msg": "You are'nt verified yet, Please try again!" })
    }
    const token = user.generateAuthToken();
    res.json({
        "token": token
    })

}

exports.login = login