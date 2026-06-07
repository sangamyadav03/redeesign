const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const requiredEnv = ['JWT_SECRET', 'MONGODB_URI'];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.warn(`[env] Missing ${key}; falling back to default value.`);
  }
}

module.exports = {
  PORT: Number(process.env.PORT) || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'zudio-dev-secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/zudiooo',
  NODE_ENV: process.env.NODE_ENV || 'development',
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || '',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || '',
};
