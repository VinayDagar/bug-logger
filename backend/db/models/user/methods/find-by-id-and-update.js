module.exports = async function (id, data) {
    try {
        const user = await domain.User.findOne({
            where: {
                id
            }
        });

        return user.update(data);
    } catch (err) {
        return Promise.reject(err);
    }
};
