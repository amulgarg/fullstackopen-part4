const listHelper = require('../utils/list_helper');

test('dummy', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1)
});

describe('total likes', () => {
	test('when list has multiple blogs, function should do the sum', () => {
		const blogs = [
			{
				_id: "5fa4d058af79801502275062",
				title: "Hello World!",
				author: "Amul Garg",
				url: "https://amulsblog.com",
				likes: 100,
				__v: 0
			},
			{
				_id: "5fa4d086af79801502275063",
				title: "Pandemic Misery :(",
				author: "Amul Garg",
				url: "https://amulsblog.com/pandemic-misery-024",
				likes: 200,
				__v: 0
			}
		];

		expect(listHelper.totalLikes(blogs)).toBe(300);

	});
	test('when list has only one blog, equals the likes of that ', () => {

		const blogs = [
			{
				_id: "5fa4d058af79801502275062",
				title: "Hello World!",
				author: "Amul Garg",
				url: "https://amulsblog.com",
				likes: 100,
				__v: 0
			}
		];

		expect(listHelper.totalLikes(blogs)).toBe(blogs[0].likes);

	});

	test('when list has 0 blogs, equals 0 ', () => {
		const blogs = [];

		expect(listHelper.totalLikes(blogs)).toBe(0);

	});

	test('when list has null blogs, equals 0 ', () => {
		const blogs = null;

		expect(listHelper.totalLikes(blogs)).toBe(0);

	});
});


describe('favourite blog', () => {
	test('when list has multiple blogs, function should find the favorite blog', () => {
		const blogs = [
			{
				_id: "5fa4d058af79801502275062",   
				title: "Hello World!",
				author: "Amul Garg",
				url: "https://amulsblog.com",
				likes: 100,
				__v: 0
			},
			{
				_id: "5fa4d086af79801502275063",
				title: "Pandemic Misery :(",
				author: "Amul Garg",
				url: "https://amulsblog.com/pandemic-misery-024",
				likes: 200,
				__v: 0
			}
		];

		expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[1]);

	});
 	test('when list has only one blog, equals that', () => {

		const blogs = [
			{
				_id: "5fa4d058af79801502275062",
				title: "Hello World!",
				author: "Amul Garg",
				url: "https://amulsblog.com",
				likes: 100,
				__v: 0
			}
		];

		expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[0]);

	});
	
	test('when list has 0 blogs, equals null', () => {
		const blogs = [];

		expect(listHelper.favoriteBlog(blogs)).toBe(null);

	});

	test('when list has null blogs, equals null', () => {
		const blogs = null;

		expect(listHelper.favoriteBlog(blogs)).toBe(null);

	});
});

describe('author with most blogs', () => {
	test('when list has multiple blogs, function should find the author with most blogs', () => {
		const blogs = [
			{
				_id: "5fa4d058af79801502275062",   
				title: "Hello World!",
				author: "Amul Garg",
				url: "https://amulsblog.com",
				likes: 100,
				__v: 0
			},
			{
				_id: "5fa4d086af79801502275063",
				title: "Pandemic Misery :(",
				author: "Amul Garg",
				url: "https://amulsblog.com/pandemic-misery-024",
				likes: 200,
				__v: 0
			},
			{
				_id: "5fa4d086af798015022750699-q",
				title: "Pandemic Misery - CounterPoint :(",
				author: "Daario",
				url: "https://amulsblog.com/pandemic-misery-counterpoint-0884",
				likes: 200,
				__v: 0
			}
		];

		expect(listHelper.mostBlogs(blogs)).toBe(blogs[0].author);

	});
 	test('when list has only one blog, equals that', () => {

		const blogs = [
			{
				_id: "5fa4d058af79801502275062",
				title: "Hello World!",
				author: "Amul Garg",
				url: "https://amulsblog.com",
				likes: 100,
				__v: 0
			}
		];

		expect(listHelper.mostBlogs(blogs)).toEqual(blogs[0].author);

	});
	
	test('when list has 0 blogs, equals null', () => {
		const blogs = [];

		expect(listHelper.mostBlogs(blogs)).toBe(null);

	});

	test('when list has null blogs, equals null', () => {
		const blogs = null;

		expect(listHelper.favoriteBlog(blogs)).toBe(null);

	});
});

describe('author with most likes on blogs', () => {
	test('when list has multiple blogs, function should find the author with most likes on blogs', () => {
		const blogs = [
			{
				_id: "5fa4d058af79801502275062",   
				title: "Hello World!",
				author: "Amul Garg",
				url: "https://amulsblog.com",
				likes: 100,
				__v: 0
			},
			{
				_id: "5fa4d086af79801502275063",
				title: "Pandemic Misery :(",
				author: "Amul Garg",
				url: "https://amulsblog.com/pandemic-misery-024",
				likes: 200,
				__v: 0
			},
			{
				_id: "5fa4d086af798015022750699-q",
				title: "Pandemic Misery - CounterPoint :(",
				author: "Daario",
				url: "https://amulsblog.com/pandemic-misery-counterpoint-0884",
				likes: 400,
				__v: 0
			}
		];

		expect(listHelper.mostLikes(blogs)).toBe(blogs[2].author);

	});
 	test('when list has only one blog, equals that', () => {

		const blogs = [
			{
				_id: "5fa4d058af79801502275062",
				title: "Hello World!",
				author: "Amul Garg",
				url: "https://amulsblog.com",
				likes: 100,
				__v: 0
			}
		];

		expect(listHelper.mostLikes(blogs)).toEqual(blogs[0].author);

	});
	
	test('when list has 0 blogs, equals null', () => {
		const blogs = [];

		expect(listHelper.mostLikes(blogs)).toBe(null);

	});

	test('when list has null blogs, equals null', () => {
		const blogs = null;

		expect(listHelper.mostLikes(blogs)).toBe(null);

	});
});