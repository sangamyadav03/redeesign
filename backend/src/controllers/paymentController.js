const { sendSuccess } = require('../utils/ApiResponse');
const {
  createRazorpayOrder,
  verifyPayment,
  getUserOrders,
} = require('../services/paymentService');

const createOrder = async (req, res, next) => {
  try {
    const result = await createRazorpayOrder(req.user._id, req.body);
    return sendSuccess(res, 201, result, 'Payment order created.');
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const order = await verifyPayment(req.user._id, req.body);
    return sendSuccess(res, 200, order, 'Payment verified successfully.');
  } catch (error) {
    next(error);
  }
};

const listOrders = async (req, res, next) => {
  try {
    const orders = await getUserOrders(req.user._id);
    return sendSuccess(res, 200, orders, 'Orders loaded.');
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, verify, listOrders };
