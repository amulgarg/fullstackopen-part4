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
