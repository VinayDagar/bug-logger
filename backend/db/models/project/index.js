const fields = require('./fields');

const ProjectSchema = SequelizeConnect.define('Project', fields, {
    hooks: requireDirectory(module, 'hooks'),
    tableName: 'project',
});

module.exports = ProjectSchema;
