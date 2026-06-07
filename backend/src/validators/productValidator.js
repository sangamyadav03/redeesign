const Joi = require('joi');

const createProductValidator = (data) =>
  Joi.object({
    title: Joi.string().min(2).max(120).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().valid('Beauty', 'Men', 'Women', 'Kids').required(),
    image: Joi.string().uri().required(),
    description: Joi.string().min(10).max(500).required(),
    quantity: Joi.number().integer().min(1).optional(),
  }).validate(data, { abortEarly: false });

module.exports = { createProductValidator };
