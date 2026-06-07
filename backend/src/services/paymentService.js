const crypto = require('crypto');
const Razorpay = require('razorpay');
const ApiError = require('../utils/ApiError');
const Order = require('../models/Order');
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = require('../config/env');
const { clearCart } = require('./cartService');

const getRazorpayInstance = () => {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new ApiError('Razorpay credentials are not configured.', 503);
  }
  return new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
};

const createRazorpayOrder = async (userId, { items, shipping, totalAmount }) => {
  if (!items?.length) throw new ApiError('Order items are required.', 400);
  if (!shipping) throw new ApiError('Shipping details are required.', 400);
  if (!totalAmount || totalAmount <= 0) throw new ApiError('Invalid order amount.', 400);

  const order = await Order.create({
    user: userId,
    items,
    shipping,
    totalAmount,
    status: 'pending',
  });

  try {
    const razorpay = getRazorpayInstance();
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: 'INR',
      receipt: `order_${order._id}`,
      notes: { orderId: order._id.toString(), userId: userId.toString() },
    });

    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    return {
      order,
      razorpayOrder,
      keyId: RAZORPAY_KEY_ID,
    };
  } catch (error) {
    order.status = 'failed';
    await order.save();
    throw new ApiError(error.message || 'Failed to create payment order.', 502);
  }
};

const verifyPayment = async (userId, { razorpayOrderId, razorpayPaymentId, razorpaySignature }) => {
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    throw new ApiError('Payment verification data is incomplete.', 400);
  }

  const order = await Order.findOne({ razorpayOrderId, user: userId });
  if (!order) throw new ApiError('Order not found.', 404);

  const body = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpaySignature) {
    order.status = 'failed';
    await order.save();
    throw new ApiError('Payment verification failed.', 400);
  }

  order.razorpayPaymentId = razorpayPaymentId;
  order.razorpaySignature = razorpaySignature;
  order.status = 'paid';
  await order.save();
  await clearCart(userId);

  return order;
};

const getUserOrders = async (userId) => {
  return Order.find({ user: userId }).sort({ createdAt: -1 });
};

module.exports = { createRazorpayOrder, verifyPayment, getUserOrders };
