const dotenv = require('dotenv').config();
const express = require('express'),
    morgan = require('morgan'),
    app = express(),
    Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

require('./main/logger/logger')();
require('./main/api/routes')(app);
require('./main/swagger/swagger')(app);
require('./main/db/db')();

if (!process.env.jwtPrivateKey) {
    console.error("FATAL ERROR: JwtPrivateKey is not defined!");
    process.exit(1);
}

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
    console.log("Morgan enabled");
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}, Please checkout : http://localhost:${port}/`));