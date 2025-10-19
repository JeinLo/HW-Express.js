// src/middlewares/logger.js
const logger = (req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}`);
  next();
};

module.exports = logger;