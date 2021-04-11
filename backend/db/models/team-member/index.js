const configSchema = SequelizeConnect.define('TeamMember', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true,
    },
    teamId: {
        type: Sequelize.TEXT,
        field: "team_id",
        allowNull: false
    },
    member: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    name: {
        type: Sequelize.TEXT,
        trim: true
    }
}, {
    tableName: 'team_member',
});

module.exports = configSchema;
