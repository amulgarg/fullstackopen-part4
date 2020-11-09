const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blogAPITestHelper = require('./blog_api_test_helpers');
const Blog = require('../models/blog');
const User = require('../models/user');


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

const getJwtToken = async () => {
	const testUserCreds = {username: 'testUser1', password: 'password'};
	const userLogin = await api.post('/api/login').send(testUserCreds).expect(200);
	return userLogin.body.token;
}

describe('creating a blog', () => {
	test('a valid blog can be added', async () => {		

		const newBlog = {
			title: "Biden vs Trump - Continued",
			author: "Nate Silver",
			url: "https://fivethirtyeight.com",
			likes: 200
		};
		
		await api.post('/api/blogs').send(newBlog).set('authorization', `Bearer ${await getJwtToken()}`).expect(201);
	
		const response = await api.get('/api/blogs');
	
		const contents = response.body.map(r => r.title);
	
		expect(response.body).toHaveLength(blogAPITestHelper.initialBlogs.length + 1);
	
		expect(contents).toContain(
			'Biden vs Trump - Continued'
		);
	});
	
	test('a blog without likes key', async () => {
		const newBlog = {
			title: "Biden vs Trump - Continued",
			author: "Nate Silver",
			url: "https://fivethirtyeight.com"
		};
		
		await api.post('/api/blogs').send(newBlog).set('authorization', `Bearer ${await getJwtToken()}`).expect(201);
	
		const response = await api.get('/api/blogs');
	
		const blog = response.body.find(r => r.title === newBlog.title);
	
		expect(response.body).toHaveLength(blogAPITestHelper.initialBlogs.length + 1);
	
		expect(blog.likes).toBe(0);
	});
	
	test('post api should return 400 status when title/url missing', async () => {
		const newBlog = {
			author: "Nate Silver",
			url: "https://fivethirtyeight.com"
		};
		
		await api.post('/api/blogs').send(newBlog).set('authorization', `Bearer ${await getJwtToken()}`).expect(400);
	});
});

describe('deletion of a blog', () => {

	test('succeeds with status code 204 if id is valid', async () => {
		const blogsResponse = await api.get('/api/blogs');
		const blogToDelete = blogsResponse.body[blogsResponse.body.length - 1]; //last blog
		await api.delete(`/api/blogs/${blogToDelete.id}`).set('authorization', `Bearer ${await getJwtToken()}`).expect(204);

		const newBlogsResponse = await api.get('/api/blogs');
		const titles = newBlogsResponse.body.map(r => r.title);

		expect(titles).not.toContain(blogToDelete.title);

	});

	test('fails with status code 404 if id is invalid', async () => {
		const invalidBlogId = "5fa64876e60b7b4be14a2d37";		
		await api.delete(`/api/blogs/${invalidBlogId}`).set('authorization', `Bearer ${await getJwtToken()}`).expect(404);
	});

})

describe('updating a blog', () => {

	test('succeeds with status code 200 if id is valid', async () => {
		const blogsResponse = await api.get('/api/blogs');
		const blogToUpdate = blogsResponse.body[0]; //first blog
		const newLikesCount = 0;
		blogToUpdate.likes = newLikesCount;
		delete blogToUpdate['user'];
		
		await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200);

		const newBlogsResponse = await api.get('/api/blogs');

		const blogToCheck = newBlogsResponse.body.find(r => r.id === blogToUpdate.id);

		expect(blogToCheck.likes).toBe(0);

	});

	test('fails with status code 404 if id is invalid', async () => {
		const invalidBlogId = "5fa64876e60b7b4be14a2d37";		
		await api.put(`/api/blogs/${invalidBlogId}`).send({likes: 0}).expect(404);
	});

})


beforeEach(async () => {
	await Blog.deleteMany({});//empty the collection
	await User.deleteMany({});
	
	const userPayload = {
		username: 'testUser1',
		password: 'password',
		name: 'Test User 1'
	};

	await api.post('/api/users').send(userPayload);

	const user = await User.findOne({username: userPayload.username});

	const newBlogs = blogAPITestHelper.initialBlogs.map(blog => new Blog({
		...blog,
		user: user._id
	}));

  	const promiseArray = newBlogs.map(blog => blog.save());
  	const allBlogs = await Promise.all(promiseArray);
	user.blogs = allBlogs.map(blog => blog._id);
	await user.save();
})

afterAll(() => {
  mongoose.connection.close()
})