const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getCart, addItem, updateItem, removeItem, clear } = require('../controllers/cartController');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getCart);
router.post('/items', addItem);
router.patch('/items/:itemId', updateItem);
router.delete('/items/:itemId', removeItem);
router.delete('/', clear);

module.exports = router;
