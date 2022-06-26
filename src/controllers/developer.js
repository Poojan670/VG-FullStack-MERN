const { Developer, validate } = require('../models/developer')

const listDevs = async (req, res) => {
    const devs = await Developer
        .find()
        .sort('devName')
    res.send(devs)
}

const createDev = async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let dev = await findOne({ devName: req.body.devName })
    if (dev) return res.status(400).json({ "error": "Developer with this name already exists!" })

    dev = new Developer({
        devName: req.body.devName,
        bio: req.body.bio,
        website: req.body.website,
    })
    dev = await dev.save()
    res.send(dev)

}

const getDev = async (req, res) => {
    const dev = await Developer.findById({ _id: req.params.id })
    if (!dev) return res.status(404).send("The Game Developer with the given id was not found!")
    res.send(dev)
}

const updateDev = async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const dev = await Developer.findByIdAndUpdate(req.params.id, {
        devName: req.body.devName,
        bio: req.body.bio,
        website: req.body.website
    }, { new: true })
    if (!dev) {
        return res.status(404).send(`Developer with ID ${req.params.id} not found`)
    }
    res.send(dev)
}

const deleteDev = async (req, res) => {
    const dev = await Developer.findByIdAndRemove(req.params.id)
    if (!dev) return res.status(404).send(`Developer with ID ${req.params.id} not found`)
    res.status(404).send();

}

exports.list = listDevs
exports.create = createDev
exports.get = getDev
exports.put = updateDev
exports.del = deleteDev
