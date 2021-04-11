const generateUniqueId = () => {
    const uniqid = require('uniqid');

    return uniqid();
};
module.exports = generateUniqueId;
