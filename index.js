const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog');
const config = require('./utils/config');
const logger = require('./utils/logger');

//controllers
const blogsRouter = require('./controllers/blogs');

const mongoUrl = config.mongodbURI;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter);


const PORT = config.port || 3003;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})