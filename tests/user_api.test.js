const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const userAPITestHelper = require('./user_api_test_helpers');
const User = require('../models/user');

const api = supertest(app);

describe('creating a user', () => {
	test('creating a valid user', async() => {
		const userPayload = {
			username: 'testUser4',
			password: 'password',
			name: 'Test User 4'
		};
		await api.post('/api/users').send(userPayload).expect(201);
	});

	test('creating a invalid user - username already in db', async () => {
		const userPayload = {
			username: 'testUser1',
			password: 'password',
			name: 'Test User 1'
		};
		await api.post('/api/users').send(userPayload).expect(400);
	});

	test('creating a invalid user - username < 3 chars', async () => {
		const userPayload = {
			username: 'tu',
			password: 'password',
			name: 'Test User 1'
		};
		await api.post('/api/users').send(userPayload).expect(400);
	});

	test('creating a invalid user - password < 3 chars', async () => {
		const userPayload = {
			username: 'testUser1',
			password: 'pa',
			name: 'Test User 1'
		};
		await api.post('/api/users').send(userPayload).expect(400);
	});


});

beforeEach(async () => {
	await User.deleteMany({});//empty the collection
	console.log('cleared')

	console.log('inserting new blogs');
	const newUsers = userAPITestHelper.initialUsers.map(user => new User(user));
  const promiseArray = newUsers.map(user => user.save());
  await Promise.all(promiseArray);

	console.log('done')
})

afterAll(()=>{
	mongoose.connection.close()
})