/*
 * Requirement - include all the global variables and module required by the application
 */

global.requireDirectory = require('../utilities/require-directory');
global.Logger = require('../utilities/logger-utility');
global.Joi = require('joi');

global.configHolder = {};

global.Sequelize = require('sequelize');
global.SequelizeConnect = require('./datasource.js')();
global.domain = require('../db/models');

global.views = require("../application/views");

configHolder.generateUniqueId = require('../application/helpers/generate-id');
configHolder.jwtUtility = require('../utilities/jwt-utility');
configHolder.emailUtility = require('../utilities/email-utility');
configHolder.encryptUtility = require('../utilities/encrypt-utility');
configHolder.smsUtility = require('../utilities/sms-utility');

module.exports = configHolder;
