const fields = require('./fields');

const notificationSchema = SequelizeConnect.define('Notification', fields, {
    tableName: 'notification',
});

module.exports = notificationSchema;
