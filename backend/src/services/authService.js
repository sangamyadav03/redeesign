const ApiError = require('../utils/ApiError');
const { generateToken } = require('../utils/token');
const User = require('../models/User');

const registerUser = async ({ name, email, password }) => {
  const normalizedEmail = String(email || '').toLowerCase().trim();

  if (!name || !normalizedEmail || !password) {
    throw new ApiError('Name, email and password are required.', 400);
  }

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new ApiError('Email already exists.', 409);
  }

  const user = await User.create({ name: name.trim(), email: normalizedEmail, password });
  const token = generateToken({
    id: String(user._id),
    email: user.email,
    role: user.role,
  });

  return {
    user: user.toSafeObject(),
    token,
  };
};

const loginUser = async ({ email, password }) => {
  const normalizedEmail = String(email || '').toLowerCase().trim();

  if (!normalizedEmail || !password) {
    throw new ApiError('Email and password are required.', 400);
  }

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    throw new ApiError('Invalid email or password.', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError('Invalid email or password.', 401);
  }

  const token = generateToken({
    id: String(user._id),
    email: user.email,
    role: user.role,
  });

  return {
    user: user.toSafeObject(),
    token,
  };
};

module.exports = { registerUser, loginUser };
