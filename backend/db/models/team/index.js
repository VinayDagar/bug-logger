const configSchema = SequelizeConnect.define('Team', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT,
        trin: true,
        allowNull: false
    },
    createdBy: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    tableName: 'team',
});

module.exports = configSchema;
