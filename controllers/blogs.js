const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
})

blogsRouter.delete('/:id', async (request, response) => {
	console.log('params', request.params);
	const result = await Blog.findByIdAndRemove(request.params.id);
	console.log('result', result);
	if(!result){
		return response.status(404).send({error: 'BLOG_NOT_FOUND'});
	}
	response.status(204).end();
})

blogsRouter.post('/', async (request, response) => {
	if(!request.body.likes) request.body.likes = 0;
	const blog = new Blog(request.body);
	const result = await blog.save();
	response.status(201).json(result);
})

module.exports = blogsRouter;