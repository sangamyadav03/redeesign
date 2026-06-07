const ApiError = require('../utils/ApiError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const populateCart = (query) =>
  query.populate({ path: 'items.product', select: 'title price image description category' });

const getOrCreateCart = async (userId) => {
  let cart = await populateCart(Cart.findOne({ user: userId }));
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await populateCart(Cart.findById(cart._id));
  }
  return cart;
};

const addToCart = async (userId, productId, quantity = 1) => {
  const product = await Product.findById(productId);
  if (!product) throw new ApiError('Product not found.', 404);

  const cart = await getOrCreateCart(userId);
  const existingIndex = cart.items.findIndex(
    (item) => item.product._id.toString() === productId
  );

  if (existingIndex > -1) {
    cart.items[existingIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity, price: product.price });
  }

  await cart.save();
  return populateCart(Cart.findById(cart._id));
};

const updateCartItem = async (userId, itemId, quantity) => {
  const cart = await getOrCreateCart(userId);
  const item = cart.items.id(itemId);
  if (!item) throw new ApiError('Cart item not found.', 404);

  if (quantity <= 0) {
    item.deleteOne();
  } else {
    item.quantity = quantity;
  }

  await cart.save();
  return populateCart(Cart.findById(cart._id));
};

const removeFromCart = async (userId, itemId) => {
  const cart = await getOrCreateCart(userId);
  const item = cart.items.id(itemId);
  if (!item) throw new ApiError('Cart item not found.', 404);

  item.deleteOne();
  await cart.save();
  return populateCart(Cart.findById(cart._id));
};

const clearCart = async (userId) => {
  const cart = await getOrCreateCart(userId);
  cart.items = [];
  await cart.save();
  return cart;
};

module.exports = {
  getOrCreateCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
