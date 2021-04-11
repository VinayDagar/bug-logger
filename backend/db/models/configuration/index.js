const configSchema = SequelizeConnect.define('Configuration', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true,
    },
    key: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    value: {
        type: Sequelize.TEXT
    }
}, {
    tableName: 'configuration',
});

module.exports = configSchema;
