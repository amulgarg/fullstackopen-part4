const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
    	required: true
	},
	author: {
		type: String,
		required: false
	},
	url: {
		type: String,
    	required: true
	},
	likes: {
		type: Number,
		required: false
	},
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
