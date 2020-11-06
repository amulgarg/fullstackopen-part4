require('dotenv').config();

const config = {
    port: process.env.PORT,
    mongodbURI: process.env.MONGODB_URI
};

module.exports = config;