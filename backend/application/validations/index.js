const Joi = require("joi");

const signupValidation = {
    body: Joi.object({
        email: Joi.string()
            .email().required(),
        name: Joi.string()
            .required(),
        password: Joi.string()
            .min(6).max(25).required(),
        phone: Joi.string()
            .min(10).max(10),
    })
};

const loginValidation = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6).required(),
    })
};

const createTaskValidation = {
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().min(10),
        priority: Joi.string(),
    })
};

module.exports = {
    signupValidation,
    loginValidation,
    createTaskValidation
};