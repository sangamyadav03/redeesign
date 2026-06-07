const { connectDB } = require('./database/connection');
const Product = require('./models/Product');
const app = require('./app');
const { PORT } = require('./config/env');

const startServer = async () => {
  await connectDB();
  await Product.seedDefaults();

  app.listen(PORT, () => {
    console.log(`Zudio backend listening on http://localhost:${PORT}`);
  });
};

startServer();
