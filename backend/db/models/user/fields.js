module.exports = {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT,
        trim: true,
    },
    // lastName: {
    //     type: Sequelize.TEXT,
    //     trim: true,
    //     field: "last_name"
    // },
    role: {
        type: Sequelize.ENUM("admin", "super_admin", "user"),
        defaultValue: "user"
    },
    phone: {
        type: Sequelize.TEXT,
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    alternatePhone: {
        type: Sequelize.TEXT,
        field: "alternate_phone"
    },
    password: {
        type: Sequelize.TEXT,
        trim: true,
    },
    salt: {
        type: Sequelize.TEXT,
        trim: true,
    },
    isAccountLocked: {
        type: Sequelize.BOOLEAN,
        field: 'is_account_locked',
        defaultValue: false,
    },
    isEmailVerified: {
        type: Sequelize.BOOLEAN,
        field: 'is_email_verified',
        defaultValue: false,
    },
    isPhoneVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: "is_phone_verified"
    },
    device: {
        type: Sequelize.TEXT, // ios, android
        defaultValue: 'android',
        trim: true,
    },
    deviceToken: {
        type: Sequelize.TEXT,
        field: 'device_token',
        trim: true,
    },
    isLoggedIn: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: "is_logged_in"
    },
    address: {
        type: Sequelize.TEXT,
        trim: true,
    },
}