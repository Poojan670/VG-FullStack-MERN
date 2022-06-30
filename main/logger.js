require('express-async-errors')
require('dotenv').config();
const winston = require('winston')
require('winston-mongodb')

module.exports = function () {
    const logger = new winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File({ filename: './main/logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: './main/logs/combined.log', handleExceptions: true, handleRejections: true }),
            new winston.transports.MongoDB({ db: `mongodb://localhost/${process.env.MONGO_DB_LOG}`, level: 'info', options: { useUnifiedTopology: true } })
        ],
    });
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }));
    }
}