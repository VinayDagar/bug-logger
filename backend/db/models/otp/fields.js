module.exports = {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "user_id"
    },
    otp: {
        type: Sequelize.TEXT,
    },
    type: {
        type: Sequelize.TEXT,
        defaultValue: "register"
    },
    status: {
        type: Sequelize.ENUM("active", "expired", "verified"),
        defaultValue: "active"
    },
    phone: {
       type: Sequelize.TEXT,
        allowNull: false
    },
    messageId: {
        type: Sequelize.TEXT,
        field: 'message_id'
    }
}