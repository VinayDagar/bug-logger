/**
 @author: Vinay Dagar
 configuration is define to make connection with the database for the different environment.
*/
const dotenv = require('dotenv');
const operatorsAliases = require('../utilities/sequelize-operator-aliases');

/**
 * 
 * @param {Object} db   postgres database instance
 * @description         tries to authenticate DB, if not then throw error
 */
function checkConnection(db) {
    db.authenticate().then(() => {
        Logger.info('Successfully connected to database.');
    }).catch((err) => {
        Logger.error('Could not connect to database!', err);
    });
}

module.exports = () => {
    dotenv.config({
        path: `${__dirname}/../env/${process.env.NODE_ENV}.env`,
    });

    const options = {
        logging: process.env.ENABLE_DB_LOG === 'true' ? (msg) => Logger.error(msg) : false,
        dialect: 'postgres',
        sync: process.env.DB_SYNC === 'true',
        timezone: 'utc',
        pool: {
            max: 10,
            min: 0,
            idle: 20000,
        },
        dialectOptions: {
            ssl: false,
            useUTC: true,
        },
        define: {
            underscored: true,
            timestamps: true,
        },
        operatorsAliases
    };

    const url = process.env.DATABASE_URL;
    const db = new Sequelize(url, options);
    checkConnection(db);

    // sychonize tables
    if (process.env.DB_SYNC === 'true') {
        const option = process.env.DB_SYNC_APPEND ? {
            append: true
        } : {};
        db.sync(option);
    }
    return db;
};
