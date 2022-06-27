require('express-async-errors')
const dotenv = require('dotenv').config();
const winston = require('winston')
require('winston-mongodb')

module.exports = function () {
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File({ filename: './main/logger/error.log', level: 'error' }),
            new winston.transports.File({ filename: './main/logger/combined.log', handleExceptions: true, handleRejections: true }),
            new winston.transports.MongoDB({ db: 'mongodb://localhost/vg_db_log', level: 'info', options: { useUnifiedTopology: true } })
        ],
    });
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }));
    }
}