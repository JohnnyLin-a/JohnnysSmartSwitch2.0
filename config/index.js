const dotenv = require('dotenv');
const envFound = dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    port: process.env.PORT,
}