const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const { User, validate } = require('../models/users')
const { hashedPassword } = require('../utils/hash')


const listUsers = async (req, res) => {
    const users = await User
        .find()
        .sort({ createdDate: 1 })
    res.send(users)
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
    user = await user.save()

    const token = user.generateAuthToken();
    res.header('x-authorization', token).send(_.pick(user, ['id', 'name', 'email']))
}

exports.register = registerUser
exports.listUsers = listUsers

// const getGame = async (req, res) => {
//     const game = await Game.findById({ _id: req.params.id })
//     if (!game) return res.status(404).send("The Game with the given id was not found!")
//     res.send(game)
// }

// const updateGame = async (req, res) => {
//     const { error } = validate(req.body)
//     if (error) {
//         res.status(400).send(error.details[0].message)
//         return;
//     }
//     const game = await Game.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
//     if (!game) {
//         return res.status(404).send(`Game with ID ${req.params.id} not found`)
//     }
//     res.send(game)
// }

// const deleteGame = async (req, res) => {
//     const game = await Genre.findByIdAndRemove(req.params.id)
//     if (!game) return res.status(404).send(`Game with ID ${req.params.id} not found`)
//     res.status(404).send();

// }

// exports.listGames = listGames;
// exports.createGames = createGames;
// exports.getGame = getGame;
// exports.updateGame = updateGame;
// exports.deleteGame = deleteGame;