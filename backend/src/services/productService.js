const Product = require('../models/Product');

const getAllProducts = async (category) => {
  const filter = category ? { category } : {};
  return Product.find(filter).sort({ createdAt: -1 });
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

const createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};

module.exports = { getAllProducts, getProductById, createProduct };
