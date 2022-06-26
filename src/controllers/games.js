const { Category } = require('../models/category')
const { Developer } = require('../models/developer')
const { Game, validate } = require('../models/games')

const listGames = async (req, res) => {
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
    const game = await Genre.findByIdAndRemove(req.params.id)
    if (!game) return res.status(404).send(`Game with ID ${req.params.id} not found`)
    res.status(404).send();

}

exports.listGames = listGames;
exports.createGames = createGames;
exports.getGame = getGame;
exports.updateGame = updateGame;
exports.deleteGame = deleteGame;