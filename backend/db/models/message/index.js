const fields = require('./fields');

const messageSchema = SequelizeConnect.define('Message', fields, {
    // hooks: requireDirectory(module, 'hooks'),
    tableName: 'message',
});

module.exports = messageSchema;
