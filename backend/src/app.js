const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Zudio backend is running with MongoDB.' });
});

app.use('/api', routes);
app.use(errorMiddleware);

module.exports = app;
