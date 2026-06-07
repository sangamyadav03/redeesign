const dotenv = require('dotenv');

dotenv.config();

const requiredEnv = ['JWT_SECRET', 'MONGODB_URI'];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.warn(`[env] Missing ${key}; falling back to default value.`);
  }
}

module.exports = {
  PORT: Number(process.env.PORT) || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'zudio-dev-secret',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/zudiooo',
  NODE_ENV: process.env.NODE_ENV || 'development',
};
