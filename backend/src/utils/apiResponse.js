const sendSuccess = (res, statusCode, payload, message) => {
  return res.status(statusCode).json({ success: true, message, data: payload });
};

const sendError = (res, statusCode, message, details = null) => {
  return res.status(statusCode).json({ success: false, message, details });
};

module.exports = { sendSuccess, sendError };
