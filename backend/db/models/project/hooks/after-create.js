module.exports = async function (instance) {
    try {

        const user = await domain.User.findByPk(instance.createdBy);

        await domain.ProjectMember.create({
            id: configHolder.generateUniqueId(),
            projectId: instance.id,
            memberId: instance.createdBy,
            name: user.name,
            role: "owner"
        });

        await domain.Section.create({
            id: configHolder.generateUniqueId(),
            name: "New Section",
            projectId: instance.id,
            createdBy: instance.createdBy
        });

        return Promise.resolve(instance);
    } catch (err) {
        return Promise.reject(err);

    }
};
