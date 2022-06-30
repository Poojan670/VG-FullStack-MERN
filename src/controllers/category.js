const { Category, validate } = require('../models/category')

const listGameCategories = async (req, res) => {
    const categories = await Category
        .find()
        .sort('title')
    res.send(categories)
}

const createGameCategory = async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let category = await Category.findOne({ title: req.body.title })
    if (category) return res.status(400).json({ "error": "Item Category with this title already exists!" })

    category = new Category({
        title: req.body.title,
    })
    category = await category.save()
    res.send(category)
}

const getGameCategory = async (req, res) => {
    const category = await Category.findById({ _id: req.params.id })
    if (!category) return res.status(404).send("The Game Category with the given id was not found!")
    res.send(category)
}

const updateGameCategory = async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const category = await Category.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true })
    if (!category) {
        return res.status(404).send(`Category with ID ${req.params.id} not found`)
    }
    res.send(category)
}

const deleteGameCategory = async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id)
    if (!category) return res.status(404).send(`Category with ID ${req.params.id} not found`)
    res.status(404).send();

}

module.exports = {
    listGameCategories,
    createGameCategory,
    getGameCategory,
    updateGameCategory,
    deleteGameCategory
}
