module.exports.isAdmin = async function (req, res, next) {
    if (req.user.userRole != 'ADMIN') {
        return res.status(403).send("You are not allowed!");
    }
    next();
}

module.exports.isDeveloper = async function (req, res, next) {
    if (req.user.userRole === 'DEVELOPER' | req.user.userRole === 'ADMIN') {
        next();
    } else {
        return res.status(403).send("You are not allowed!");
    }
}