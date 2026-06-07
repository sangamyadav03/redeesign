const { sendSuccess } = require('../utils/ApiResponse');
const { getAllProducts, getProductById, createProduct } = require('../services/productService');
const ApiError = require('../utils/ApiError');

const listProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    const products = await getAllProducts(category);
    return sendSuccess(res, 200, products, 'Products loaded.');
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) throw new ApiError('Product not found.', 404);
    return sendSuccess(res, 200, product, 'Product loaded.');
  } catch (error) {
    next(error);
  }
};

const createProductHandler = async (req, res, next) => {
  try {
    const product = await createProduct(req.body);
    return sendSuccess(res, 201, product, 'Product added successfully.');
  } catch (error) {
    next(error);
  }
};

module.exports = { listProducts, getProduct, createProductHandler };
