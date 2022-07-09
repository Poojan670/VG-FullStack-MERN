const paginate = require('../../middleware/pagination')
const { UserDetails, validate } = require('../models/userDetails')

const createUserDetails = async function (req, res) {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    if (!req.file) {
        return res.status(403).send("Error in Image Upload, Please try again!")
    }
    let userDetail = await UserDetails.findOne({ user: req.body.userId })
    if (userDetail) return res.status(400).json({ "msg": "User Details of this user already exists!" })
    const userId = req.user._id
    userDetail = new UserDetails({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        user: userId,
        dateOfBirth: req.body.dateOfBirth,
        userPhoto: req.file.path
    })
    await userDetail.save()
    res.status(201).send(userDetail)
}

const listUserDetails = async function (req, res) {
    const userDetails = await UserDetails.find().sort('createdAt')
    const result = await paginate(userDetails, req, res)
    res.json(result)
}

const getuserDetail = async function (req, res) {
    const userDetail = await UserDetails.findOne({ user: req.user._id })
    if (!userDetail) return res.status(403).json({ "msg": "User Details not found!" })
    res.send(userDetail)
}

module.exports = {
    createUserDetails,
    listUserDetails,
    getuserDetail
}