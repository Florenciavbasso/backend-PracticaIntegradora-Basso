require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI || 'mongodb://localhost:27017/charra',
  apiKey: process.env.API_KEY || 'your_api_key',
  secretKey: process.env.SECRET_KEY || 'your_secret_key',
  // otras configuraciones
};

module.exports = config;
