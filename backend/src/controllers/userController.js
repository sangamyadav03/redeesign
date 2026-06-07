const { getProfile } = require('../services/userService');
const { sendSuccess } = require('../utils/ApiResponse');

const getMe = async (req, res, next) => {
  try {
    const user = await getProfile(req.user._id || req.user.id);
    return sendSuccess(res, 200, { user }, 'Profile loaded successfully.');
  } catch (error) {
    next(error);
  }
};

module.exports = { getMe };
