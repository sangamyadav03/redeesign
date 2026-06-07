const ApiError = require('../utils/ApiError');
const { verifyToken } = require('../utils/token');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return next(new ApiError('Authentication token is required.', 401));
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new ApiError('User not found.', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError('Invalid or expired token.', 401));
  }
};

module.exports = authMiddleware;
