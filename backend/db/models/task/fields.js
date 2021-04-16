module.exports = {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.TEXT,
        trim: true,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        trim: true
    },
    priority: {
        type: Sequelize.ENUM("high", "medium", "low"),
        defaultValue: "low"
    },
    createdBy: {
        type: Sequelize.TEXT,
        field: "created_by",
        allowNull: false
    },
    assignedTo: {
        type: Sequelize.TEXT,
        field: "assigned_to",
    },
    sectionId: {
        type: Sequelize.TEXT,
        field: "section_id",
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM("pending", "completed", "in_progress"),
        defaultValue: "pending"
    }
}