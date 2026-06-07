const Joi = require('joi');

const registerValidator = (data) =>
  Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      .required()
      .messages({
        'string.pattern.base': 'Password must include uppercase, lowercase, and a number.',
      }),
  }).validate(data, { abortEarly: false });

module.exports = registerValidator;
