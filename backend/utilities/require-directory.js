const requireDirectory = require('require-directory');
const s = require('underscore.string');

module.exports = function (base, directory) {
    return requireDirectory(base, directory, {
        rename: name => s.camelize(name),
    });
};