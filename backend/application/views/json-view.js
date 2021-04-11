/**
 * Simply sends the serialised object.
 *
 * @param {Object}  result     The response object to be serialised.
 * 
 */

const JsonView = function (result) {
    const date = new Date();

    return {
        error: false,
        object: result,
        message: "",
        extendedMessage: "",
        status: 200,
        timeStamp: date.toISOString()
    }
}

module.exports = JsonView;
