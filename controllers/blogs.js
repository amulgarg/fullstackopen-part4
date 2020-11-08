const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {blogs: 0});
	response.json(blogs);
})

blogsRouter.delete('/:id', async (request, response) => {
	const result = await Blog.findByIdAndRemove(request.params.id);
	if(!result){
		return response.status(404).send({error: 'BLOG_NOT_FOUND'});
	}
	response.status(204).end();
})

blogsRouter.post('/', async (request, response) => {
	if(!request.body.likes) request.body.likes = 0;
	const user = await User.findOne(); //pick any user
	console.log('user', user);
	const newBlogPayload = {
		...request.body,
		user: user._id
	}
	const newBlog = new Blog(newBlogPayload);
	const blogResult = await newBlog.save();

	user.blogs = user.blogs.concat(blogResult._id);
	user.save();
	
	response.status(201).json(blogResult);
})

blogsRouter.put('/:id', async (request, response) => {
	console.log('payload', request.body, request.params);

	const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });

	if(!result){
		return response.status(404).send({error: 'BLOG_NOT_FOUND'});
	}

	console.log('blog updated', result);
	response.json(result);
});

module.exports = blogsRouter;