module.exports = {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true,
    },
    projectName: {
        type: Sequelize.STRING,
        trim: true,
        field: "project_name"
    },
    view: {
        type: Sequelize.ENUM("list", "card"),
        defaultValue: "list"
    },
    createdBy: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: "created_by"
    },
    description: {
        type: Sequelize.TEXT,
    }
}