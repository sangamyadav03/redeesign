const { connectDB } = require('./database/connection');
const Product = require('./models/Product');
const app = require('./app');
const { PORT } = require('./config/env');

const startServer = async () => {
  const server = app.listen(PORT, () => {
    console.log(`Zudio backend listening on http://localhost:${PORT}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use.`);
      console.error('Close the existing process or use another port.');
    } else {
      console.error(error);
    }
  });

  // Kick off DB/seed, but never block server from starting.
  try {
    await connectDB();
    await Product.seedDefaults();
  } catch (error) {
    console.error('⚠️ Mongo/seed failed during startup (server still running):', error);
  }
};

startServer();
