module.exports = async (email) => {
    const query = {
        where: {
            email,
        }
    };

    const user = await domain.User.findOne(query);

    return user;
};
