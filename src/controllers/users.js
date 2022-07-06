require('dotenv').config()
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const paginate = require('../../middleware/pagination')
const { User, validate } = require('../models/users')
const { hashedPassword } = require('../utils/hash')
const { mail } = require('../utils/mail')


const listUsers = async (req, res) => {
    const users = await User
        .find()
        .sort({ createdDate: 1 })
        .select('userName email')
    const result = await paginate(users, req, res)
    res.json(result)
}

const getUser = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(403).json({ "msg": "User not found!" })
    res.send(user);
}

const registerUser = async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ "msg": "User already registerd" })

    user = new User(_.pick(req.body, ['userName', 'email', 'password']))

    user.password = await hashedPassword(user.password)

    const verificationToken = user.generateVerificationToken();
    const url = `http://localhost:${process.env.PORT}/api/v1/users/verify/${verificationToken}`

    await mail.sendMail({
        to: user.email,
        subject: 'Verify Account',
        html: `Click <a href = '${url}'>here</a> to confirm your email.`
    })

    await user.save()

    return res.status(201).json({
        "msg": `Sent a verification mail to ${user.email}`
    });
    // const token = user.generateAuthToken();
    // res.header('x-authorization', token).send(_.pick(user, ['id', 'name', 'email']))
}

const updateUserRole = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findByIdAndUpdate(req.params._id, { userRole: req.body.userRole })
    if (!user) {
        return res.status(404).json({
            "msg": `User with this ${req.params._id} not found!`
        })
    }
}

const verifyUser = async (req, res) => {
    const token = req.params.id
    if (!token) {
        return res.status(422).json({
            "msg": "Missing Token"
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
        return res.status(404).json({
            "msg": "User does not  exists"
        });
    }
    user.isActive = true;
    await user.save();

    return res.status(200).json({
        "msg": "Account Verified"
    })
}

const resendCode = async (req, res) => {
    const email = req.body.email
    if (!email) return res.status(422).json({
        "message": "Missing email"
    })
    const user = await User.findById({ email: email })
    if (!user) {
        return res.status(404).json({
            "msg": `User with this ${req.body.email} not found, Please try again!`
        })
    }

    const verificationToken = user.generateVerificationToken();
    const url = `http://localhost:${process.env.PORT}/api/v1/users/verify/${verificationToken}`

    await mail.sendMail({
        to: email,
        subject: 'Resend Verification Code',
        html: `Click <a href = '${url}'>here</a> to confirm your email.`
    })

    return res.status(201).json({
        "msg": `Sent a verification mail to ${email}`
    });
}

const deleteUser = async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id)
    if (!user) return res.status(404).send("User not found!")
    res.status(404).send();
}

const deactivate = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id, { isActive: false })
    if (!user) return res.status(404).json({
        "msg": "User not found!"
    })

    res.status(200).json({
        "msg": "Sucessfully Deactivated your account!"
    })
}

module.exports = {
    registerUser,
    listUsers,
    getUser,
    updateUserRole,
    verifyUser,
    resendCode,
    deleteUser,
    deactivate
}
