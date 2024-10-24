require("dotenv").config();

module.exports = {
  MONGO_DB: process.env.JNCVBP_MONGO_DB || "mongodb://127.0.0.1:27017/jncvbpms",
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.JNCVBP_HOST || "127.0.0.1",
  PORT: process.env.JNCVBP_PORT || process.env.PORT || 3000,
};
