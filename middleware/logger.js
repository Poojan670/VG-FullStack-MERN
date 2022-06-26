const debug = require('debug')('app:startup')

function log(req, res, next) {
    debug('Logging');
    next();
}

module.exports = log;