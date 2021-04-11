module.exports = async function ({ email, phone }) {
    try {
        console.log({ email })
        const user = await domain.User.findOne({
            where: { email, phone }
        });

        return user;
    } catch (err) {
        return Promise.reject(err);
    }
};
