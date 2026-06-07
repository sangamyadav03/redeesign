const express = require('express');
const { register, login, me } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const registerValidator = require('../validators/registerValidator');
const loginValidator = require('../validators/loginValidator');

const router = express.Router();

router.post('/register', validationMiddleware(registerValidator), register);
router.post('/login', validationMiddleware(loginValidator), login);
router.get('/me', authMiddleware, me);

module.exports = router;
