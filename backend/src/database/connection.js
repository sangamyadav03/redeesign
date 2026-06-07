const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config/env');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      autoIndex: true,
    });

    console.log('[mongo] Connected to MongoDB');
  } catch (error) {
    console.error('[mongo] Connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
