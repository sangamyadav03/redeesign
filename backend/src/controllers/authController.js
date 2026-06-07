const { registerUser, loginUser } = require('../services/authService');
const { sendSuccess } = require('../utils/ApiResponse');

const register = async (req, res, next) => {
  try {
    const data = await registerUser(req.body);
    return sendSuccess(res, 201, data, 'User registered successfully.');
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const data = await loginUser(req.body);
    return sendSuccess(res, 200, data, 'Login successful.');
  } catch (error) {
    next(error);
  }
};

const me = (req, res) => {
  const user = typeof req.user.toSafeObject === 'function' ? req.user.toSafeObject() : req.user;
  return sendSuccess(res, 200, { user }, 'Authenticated user profile loaded.');
};

module.exports = { register, login, me };
