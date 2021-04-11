module.exports = {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true,
    },
    projectName: {
        type: Sequelize.TEXT,
        trim: true,
        field: "project_name"
    },
    view: {
        type: Sequelize.ENUM("list", "card"),
        defaultValue: "list"
    },
    createdBy: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: "created_by"
    }
}