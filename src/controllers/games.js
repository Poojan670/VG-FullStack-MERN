const { Category } = require('../models/category')
const { Developer } = require('../models/developer')
const { Game, validate } = require('../models/games')
const { User } = require('../models/users')

const listGames = async (req, res, next) => {
    const games = await Game
        .find()
        .sort({ name: 1 })
    res.send(games)
}

const createGames = async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const category = await Category.findById(req.body.categoryId)
    if (!category) return res.status(400).send("Game Category Not Found!")
    const dev = await Developer.findById(req.body.developerId)
    if (!dev) return res.status(400).send("Game Dev Not Found!")
    let game = new Game({
        title: req.body.title,
        price: req.body.price,
        category: category,
        developer: dev
    })
    game = await game.save()
    res.send(game)
}

const getGame = async (req, res) => {
    const game = await Game.findById({ _id: req.params.id })
    if (!game) return res.status(404).send("The Game with the given id was not found!")
    res.send(game)
}

const updateGame = async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const game = await Game.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!game) {
        return res.status(404).send(`Game with ID ${req.params.id} not found`)
    }
    res.send(game)
}

const deleteGame = async (req, res) => {
    const game = await Game.findByIdAndRemove(req.params.id)
    if (!game) return res.status(404).send(`Game with ID ${req.params.id} not found`)
    res.status(404).send();

}

const BuyGame = async (req, res) => {
    const game = await Game.findById(req.params.id)
    if (!game) return res.status(404).send(`Game with ID ${req.params.id} not found`)

    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).send('User not found')

    if (user.walletAmount < game.price) {
        res.status(400).json({ "ERROR": "Insufficient Balance to buy this game, Please try again!" })
    }
    await user.updateOne({ games: req.params.id, walletAmount: walletAmount - game.price })

    await game.updateOne(
        { soldTo: soldTo.push(req.user_id) },
        { soldCount: soldCount++ },
        { numberInStock: numberInStock-- }
    )

    res.status(200).json({ "success": "Game Bought Successfully!" })

}

exports.listGames = listGames;
exports.createGames = createGames;
exports.getGame = getGame;
exports.updateGame = updateGame;
exports.deleteGame = deleteGame;
exports.BuyGame = BuyGame;