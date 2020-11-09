const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {blogs: 0});
	response.json(blogs);
})

blogsRouter.delete('/:id', async (request, response) => {

	const blog = await Blog.findById(request.params.id);

	if(!blog){
		return response.status(404).send({error: 'BLOG_NOT_FOUND'});
	}

	let decodedToken = null;

	try{
		decodedToken = jwt.verify(request.token, process.env.SECRET);
		if (!request.token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' })
		}
	} catch(error){
		return response.status(401).json({ error: 'token missing or invalid' });
	};
	
	if(decodedToken.id.toString() === blog.user.toString()){
		await Blog.findByIdAndRemove(request.params.id);		
		response.status(204).end();
	} else{
		return response.status(401).json({error: 'you can\'t delete someone else\'s blog'})
	}
})

blogsRouter.post('/', async (request, response) => {
	if(!request.body.likes) request.body.likes = 0;

	let decodedToken = null;

	try{
		decodedToken = jwt.verify(request.token, process.env.SECRET);
		if (!request.token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' })
		}
	} catch(error){
		return response.status(401).json({ error: 'token missing or invalid' });
	};

	const user = await User.findById(decodedToken.id)
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
	const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });

	if(!result){
		return response.status(404).send({error: 'BLOG_NOT_FOUND'});
	}

	response.json(result);
});

module.exports = blogsRouter;