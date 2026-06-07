const express = require('express');
const { listProducts, getProduct, createProductHandler } = require('../controllers/productController');
const validationMiddleware = require('../middleware/validationMiddleware');
const { createProductValidator } = require('../validators/productValidator');

const router = express.Router();

router.get('/', listProducts);
router.post('/', validationMiddleware(createProductValidator), createProductHandler);
router.get('/:id', getProduct);

module.exports = router;
