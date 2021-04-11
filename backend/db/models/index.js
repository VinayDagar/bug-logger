// All data base models

const User = require('./user');
const Project = require('./project');
const ProjectMember = require('./project-member');
const Otp = require('./otp');
const Configuration = require('./configuration');
const Team = require('./team');
const TeamMember = require('./team-member');
const Task = require('./task');
const Section = require("./section");

const domain = {
    User,
    Project,
    Otp,
    Configuration,
    Team,
    TeamMember,
    Task,
    Section,
    ProjectMember
};

require('./associations')(domain);

module.exports = domain;