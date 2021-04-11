const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new (winston.transports.Console)({
            handleExceptions: true,
            json: true,
        }),
    ],
});

module.exports = logger;
