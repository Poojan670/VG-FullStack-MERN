module.exports = function (err, req, res, next) {
    res.status(500).send(`Error Occurred due to ${err}, Please try again!`)
}