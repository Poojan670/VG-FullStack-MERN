require('dotenv').config()
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const { User, validate } = require('../models/users')
const { hashedPassword } = require('../utils/hash')
const { mail } = require('../utils/mail')


const listUsers = async (req, res) => {
    const users = await User
        .find()
        .sort({ createdDate: 1 })
        .select('userName email')
    res.send(users)
}

const getUser = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(403).json({ "error": "User not found!" })
    res.send(user);

}
const registerUser = async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ "error": "User already registerd" })

    user = new User(_.pick(req.body, ['userName', 'email', 'password']))

    user.password = await hashedPassword(user.password)

    const verificationToken = user.generateVerificationToken();
    const url = `http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}`

    await mail.sendMail({
        to: user.email,
        subject: 'Verify Account',
        html: `Click <a href = '${url}'>here</a> to confirm your email.`
    })
    await user.save()

    return res.status(201).json({
        "message": `Sent a verification mail to ${user.email}`
    });
    // const token = user.generateAuthToken();
    // res.header('x-authorization', token).send(_.pick(user, ['id', 'name', 'email']))
}

const updateUserRole = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findByIdAndUpdate(req.params._id, { userRole: req.body.userRole })
    if (!user) {
        return res.status(404).send(`User with this ${req.params._id} not found!`)
    }
}

const verifyUser = async (req, res) => {
    const token = req.params.id
    if (!token) {
        return res.status(422).send({
            message: "Missing Token"
        });
    }

    try {
        payload = jwt.verify(
            token,
            process.env.USER_VERIFICATION_TOKEN_SECRET
        );
    } catch (err) {
        return res.status(500).send(err);
    }

    const user = await User.findOne({ _id: payload._id }).exec();
    if (!user) {
        return res.status(404).send({
            message: "User does not  exists"
        });
    }
    user.isActive = true;
    await user.save();

    return res.status(200).send({
        message: "Account Verified"
    })
}

module.exports = {
    registerUser,
    listUsers,
    getUser,
    updateUserRole,
    verifyUser,
}

// const deleteGame = async (req, res) => {
//     const game = await Genre.findByIdAndRemove(req.params.id)
//     if (!game) return res.status(404).send(`Game with ID ${req.params.id} not found`)
//     res.status(404).send();

// }