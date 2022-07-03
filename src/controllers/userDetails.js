const paginate = require('../../middleware/pagination')
const { UserDetails, validate } = require('../models/userDetails')

const createUserDetails = async function (req, res) {
    console.log(req.file);
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let userDetail = await UserDetails.findOne({ user: req.body.userId })
    if (userDetail) return res.status(400).json({ "error": "User Details of this user already exists!" })

    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');

    userDetail = new UserDetails({
        firstName: req.body.firstName,
        middleName: req.body.firstName,
        lastName: req.body.firstName,
        user: req.body.userId,
        dateOfBirth: req.body.dateOfBirth,
        // userPhoto: req.file.filename
    })
    userDetail.userPhoto = Buffer.from(encode_image, 'base64')
    userDetail = await userDetail.save()
    res.status(201).send(userDetail)
}

const listUserDetails = async function (req, res) {
    const userDetails = await UserDetails.find().sort('createdAt')
    const result = await paginate(userDetails, req, res)
    res.json(result)
}

const getuserDetail = async function (req, res) {
    const userDetail = await UserDetails.findOne({ user: req.user._id })
    if (!userDetail) return res.status(403).json({ "error": "User Details not found!" })
    res.send(userDetail)
}

module.exports = {
    createUserDetails,
    listUserDetails,
    getuserDetail
}