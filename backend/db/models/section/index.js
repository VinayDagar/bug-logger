const sectionSchema = SequelizeConnect.define('Section', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,
        trin: true,
        allowNull: false
    },
    createdBy: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    projectId: {
        type: Sequelize.TEXT,
        field: "project_id",
        allowNull: false
    }
}, {
    tableName: 'section',
});

module.exports = sectionSchema;
