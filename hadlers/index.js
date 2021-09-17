const { initialize } = require('express-openapi');

const Movie = require('./movie.handler');
const User = require('./user.handler');

const apiHandlers = { ...User, ...Movie };
const apiSpecFile = require('./openapi.json');

module.exports = (app) => {
	initialize({
		app,
		apiDoc: apiSpecFile,
		operations: apiHandlers,
	});

	return app;
};
