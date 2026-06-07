const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createOrder, verify, listOrders } = require('../controllers/paymentController');

const router = express.Router();

router.use(authMiddleware);

router.post('/create-order', createOrder);
router.post('/verify', verify);
router.get('/orders', listOrders);

module.exports = router;
