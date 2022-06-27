const jwt = require('jsonwebtoken')
require('dotenv')

module.exports = function auth(req, res, next) {
    const token = req.header('x-authorization');
    if (!token) return res.status(401).send("Access Denied, No Token Provided!")

    try {
        const decode = jwt.verify(token, process.env.jwtPrivateKey)
        req.user = decode;
        next();
    } catch (Exception) {
        res.status(400).send("Invalid Token, PLease Try Again!")
    }
}



