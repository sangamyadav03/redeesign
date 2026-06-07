const Joi = require('joi');

const loginValidator = (data) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(data, { abortEarly: false });

module.exports = loginValidator;
