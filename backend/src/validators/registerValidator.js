const Joi = require('joi');

const registerValidator = (data) =>
  Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(data, { abortEarly: false });

module.exports = registerValidator;
