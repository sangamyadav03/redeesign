const { sendSuccess } = require('../utils/ApiResponse');
const {
  getOrCreateCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../services/cartService');

const getCart = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    return sendSuccess(res, 200, cart, 'Cart loaded.');
  } catch (error) {
    next(error);
  }
};

const addItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await addToCart(req.user._id, productId, quantity || 1);
    return sendSuccess(res, 200, cart, 'Item added to cart.');
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await updateCartItem(req.user._id, req.params.itemId, quantity);
    return sendSuccess(res, 200, cart, 'Cart updated.');
  } catch (error) {
    next(error);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const cart = await removeFromCart(req.user._id, req.params.itemId);
    return sendSuccess(res, 200, cart, 'Item removed from cart.');
  } catch (error) {
    next(error);
  }
};

const clear = async (req, res, next) => {
  try {
    const cart = await clearCart(req.user._id);
    return sendSuccess(res, 200, cart, 'Cart cleared.');
  } catch (error) {
    next(error);
  }
};

module.exports = { getCart, addItem, updateItem, removeItem, clear };
