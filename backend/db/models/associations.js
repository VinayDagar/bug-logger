module.exports = function (domain) {
    // ----------- User---------------------

    domain.User.hasMany(domain.Project, {
        foreignKey: 'createdBy',
    });


    domain.User.hasMany(domain.Team, {
        foreignKey: 'createdBy',
    });

    domain.User.hasMany(domain.Team, {
        foreignKey: 'createdBy',
    });

    domain.User.hasMany(domain.Task, {
        foreignKey: 'createdBy',
    });

    domain.User.hasMany(domain.Task, {
        foreignKey: 'assignedTo',
    });

    domain.User.hasMany(domain.Section, {
        foreignKey: 'createdBy',
    });

    //---------------Team ------------------

    domain.Team.belongsTo(domain.User, {
        foreignKey: 'createdBy',
    });

    domain.Team.hasMany(domain.TeamMember, {
        foreignKey: 'teamId',
    });

    // ------------- TeamMember ------------------

    domain.TeamMember.belongsTo(domain.Team, {
        foreignKey: 'teamId',
    });

    domain.TeamMember.belongsTo(domain.User, {
        foreignKey: 'member',
    });

    // -------------------Task----------------

    domain.Task.belongsTo(domain.Section, {
        foreignKey: "sectionId"
    });

    domain.Task.belongsTo(domain.User, {
        foreignKey: "createdBy"
    });

    domain.Task.belongsTo(domain.ProjectMember, {
        foreignKey: "assignedTo"
    });

    domain.ProjectMember.hasMany(domain.Task, {
        foreignKey: "assignedTo"
    });

    // --------------Project ----------------

    domain.Project.belongsTo(domain.User, {
        foreignKey: 'createdBy',
    });

    domain.Project.hasMany(domain.Section, {
        foreignKey: 'projectId',
    });

    domain.Project.hasMany(domain.ProjectMember, {
        foreignKey: 'projectId',
    });

    domain.ProjectMember.belongsTo(domain.Project, {
        foreignKey: 'projectId',
    });

    domain.User.hasMany(domain.ProjectMember, {
        foreignKey: 'memberId',
    });

    domain.ProjectMember.belongsTo(domain.User, {
        foreignKey: 'memberId',
    });
    // ----------Section-------------------

    domain.Section.belongsTo(domain.User, {
        foreignKey: "createdBy"
    });

    domain.Section.belongsTo(domain.Project, {
        foreignKey: "projectId"
    });

    domain.Section.hasMany(domain.Task, {
        foreignKey: "sectionId"
    });

    // ---------- Notification ------------------
    domain.Notification.belongsTo(domain.User, {
        foreignKey: "userId"
    });

    domain.User.hasMany(domain.Notification, {
        foreignKey: "userId"
    });

};
