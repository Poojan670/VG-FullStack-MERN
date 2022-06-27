const dotenv = require('dotenv').config();
const morgan = require('morgan')

module.exports = function (app) {
    if (!process.env.jwtPrivateKey) {
        console.error("FATAL ERROR: JwtPrivateKey is not defined!");
        process.exit(1);
    }

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('tiny'));
        console.log("Morgan enabled");
    }
}