const { v1 } = require("uuid");
const uniqid = require('uniqid');

module.exports = function (instance) {
    const salt = v1();
    const hashedPassword = configHolder.encryptUtility.createHash(salt, instance.password);

    instance.password = hashedPassword;
    instance.salt = salt;
    instance.id = uniqid();

    return Promise.resolve(instance);
};
