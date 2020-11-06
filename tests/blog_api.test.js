const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blogAPITestHelper = require('./blog_api_test_helpers');
const Blog = require('../models/blog');

const api = supertest(app);

test('there are three blogs', async () => {
	const response = await api.get('/api/blogs');	
	expect(response.body).toHaveLength(3);
});

test('there exists an id property', async () => {
	const response = await api.get('/api/blogs');
	const blogs = response.body;
	expect(blogs[0].id).toBeDefined();	
});

beforeEach(async () => {
	await Blog.deleteMany({});//empty the collection
	console.log('cleared')

	console.log('inserting new blogs');
	const newBlogs = blogAPITestHelper.initialBlogs.map(blog => new Blog(blog))
  	const promiseArray = newBlogs.map(blog => blog.save());
  	await Promise.all(promiseArray);

	console.log('done')
})

afterAll(() => {
  mongoose.connection.close()
})