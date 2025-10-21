// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('./middlewares/cors');
const logger = require('./middlewares/logger');
const errorHandler = require('./utils/errorHandler');
const routes = require('./routes');

dotenv.config();
const { PORT = 3005, API_URL = 'http://127.0.0.1', MONGO_URL = 'mongodb://localhost:27017/mydb' } = process.env;

mongoose.connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at ${API_URL}:${PORT}`);
    });
  })
  .catch(err => console.error(`Failed to connect to MongoDB: ${err.message}`));

const app = express();

app.use(bodyParser.json());
app.use(cors);
app.use(logger);
app.use('/', routes);

// Обработка несуществующих роутов
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

