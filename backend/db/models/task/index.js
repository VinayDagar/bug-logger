const fields = require("./fields");

const TaskSchema = SequelizeConnect.define('Task', fields, {
    hooks: requireDirectory(module, 'hooks'),
    tableName: 'task',
});

module.exports = TaskSchema;
