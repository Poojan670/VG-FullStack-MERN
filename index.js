// Environment
const dotenv = require('dotenv').config();

//  Loggers
const winston = require('winston')
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: './logs/combined.log', handleExceptions: true, handleRejections: true }),
        // new winston.transports.MongoDB({ db: 'mongodb://localhost/vg_db_log', level: 'info' })
    ],
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

//Error Handling
require('express-async-errors')

// Main packages use
const express = require('express'),
    morgan = require('morgan'),
    app = express(),
    mongoose = require('mongoose'),
    Joi = require('joi')

Joi.objectId = require('joi-objectid')(Joi)

// Main App Calls
require('./main/api/routes')(app);
require('./main/swagger/swagger')(app);

// Mongo Db Connection Config
mongoose.connect('mongodb://localhost/vg_db')
    .then(() => console.log('Connected to Mongodb..'))
    .catch(err => console.log("Couldn't connect to MongoDb"))

// Config
const config = require('config')
if (!process.env.jwtPrivateKey) {
    console.error("FATAL ERROR: JwtPrivateKey is not defined!");
    process.exit(1);
}

// morgan 
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
    console.log("Morgan enabled");
}

// run server in assigned port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}, Please checkout : http://localhost:${port}/`));