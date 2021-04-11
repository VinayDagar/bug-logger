const ProjectMemberSchema = SequelizeConnect.define('ProjectMember', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT,
        trin: true,
        allowNull: false
    },
    memberId: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    projectId: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    tableName: 'project_member',
});

module.exports = ProjectMemberSchema;
