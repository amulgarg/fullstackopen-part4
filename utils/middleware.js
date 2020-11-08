const errorHandler = (error, request, response, next) => {

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error);
}

const jwtTokenExtractor = (request, response, next) => {
	
	let token = null;

	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		token = authorization.substring(7)
	}
	
	request.token = token;

	next();
}

module.exports = {
	errorHandler,
	jwtTokenExtractor
};