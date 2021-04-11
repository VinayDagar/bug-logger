const crypto = require('crypto');

module.exports = (function () {
    const createHash = (salt, value) => {
        return crypto.createHmac('sha1', salt).update(value).digest('hex');
    };

    return {
        createHash
    }

})() 
