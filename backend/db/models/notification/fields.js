module.exports = {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: "user_id"
    },
    message: {
        type: Sequelize.TEXT,
        trim: true
    },
    type: {
        type: Sequelize.TEXT,
        defaultValue: "project_created"
    },
    status: {
        type: Sequelize.ENUM("read", "unread"),
        defaultValue: "unread"
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    payload: {
        type: Sequelize.JSONB,
    }
}