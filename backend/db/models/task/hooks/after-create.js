module.exports = async function (instance) {
    try {
        Promise.resolve(instance);
    } catch (err) {
        Promise.reject(err);
    }
}