require('dotenv').config();

const config = {
    port: process.env.PORT,
    mongodbURI: process.env.NODE_ENV == 'test' ? process.env.MONGODB_TEST_URI:  process.env.MONGODB_URI
};

module.exports = config;