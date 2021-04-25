module.exports = {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true,
    },
    from: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    to: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    message: {
        type: Sequelize.TEXT,
        trim: true
    },
    status: {
        type: Sequelize.ENUM("unread", "read"),
        defaultValue: "unread"
    },
    readTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}