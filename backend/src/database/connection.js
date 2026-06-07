const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config/env');

mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { autoIndex: true });
    console.log(`[mongo] Connected to ${MONGODB_URI}`);
  } catch (error) {
    console.error('[mongo] Connection failed:', error.message);
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    console.error('[mongo] Runtime error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[mongo] Disconnected from MongoDB');
  });
};

module.exports = { connectDB };
