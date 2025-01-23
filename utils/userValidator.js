const Joi = require('joi');

const validateRegisterInput = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required().messages({
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 3 characters long',
            'string.max': 'Username must not exceed 30 characters',
        }),
        password: Joi.string().min(6).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
        }),
    });

    return schema.validate(data);
};

// Validator for login input
const validateLoginInput = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().messages({
            'string.empty': 'Username is required',
        }),
        password: Joi.string().required().messages({
            'string.empty': 'Password is required',
        }),
    });

    return schema.validate(data);
};

module.exports = { validateRegisterInput, validateLoginInput };