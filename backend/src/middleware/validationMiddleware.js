const validationMiddleware = (validator) => (req, res, next) => {
  const { error } = validator(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message.replace(/\"/g, ''),
    });
  }

  next();
};

module.exports = validationMiddleware;
