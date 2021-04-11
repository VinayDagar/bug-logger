const fields = require('./fields');

const userSchema = SequelizeConnect.define('User', fields, {
    hooks: requireDirectory(module, 'hooks'),
    tableName: 'user',
});

Object.assign(userSchema, requireDirectory(module, 'methods'));
// Object.assign(userSchema.prototype, requireDirectory(module, 'instance-methods'));

module.exports = userSchema;
