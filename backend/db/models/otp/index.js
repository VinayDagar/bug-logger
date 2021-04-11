const fields = require('./fields');

const otpSchema = SequelizeConnect.define('Otp', fields, {
    // hooks: requireDirectory(module, 'hooks'),
    tableName: 'otp',
});

module.exports = otpSchema;
