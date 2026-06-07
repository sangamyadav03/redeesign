const express = require('express');
const cors = require('cors');
const Product = require('./models/Product');
const Submission = require('./models/Submission');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Zudio backend is running with MongoDB.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/api/products', async (_req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, message: 'Products loaded.', data: products });
  } catch (error) {
    next(error);
  }
});

app.post('/api/submissions', authMiddleware, async (req, res, next) => {
  try {
    const submission = await Submission.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({ success: true, message: 'Submission saved.', data: submission });
  } catch (error) {
    next(error);
  }
});

app.use(errorMiddleware);

module.exports = app;
