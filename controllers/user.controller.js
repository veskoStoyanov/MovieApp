const jwt = require('jsonwebtoken');

const { Movie, User } = require('../models');

const getUserById = (id = String) => User.findById(id);

const getUserByData = (data = Object) => User.findOne(data);

const createUser = (data = Object) => User.create(data);

const getMovies = (id) => User.findById(id).populate('movies').select('movies');

const unLikeMovie = async (userId, movieId) => {
	try {
		const user = await getUserById(userId);
		user.movies = user.movies.filter((x) => x.toString() !== movieId);
		user.markModified('movies');
		await user.save();

		const movie = await Movie.findById(movieId);
		movie.rating--;
		movie.save();

		return { userMovies: user.movies };
	} catch (e) {
		return { error: e };
	}
};

const likeMovie = async (userId, movieId) => {
	try {
		const user = await getUserById(userId);
		user.movies.push(movieId);
		user.markModified('movies');
		await user.save();

		const movie = await Movie.findById(movieId);
		movie.rating++;
		await movie.save();

		return { userMovies: user.movies };
	} catch (e) {
		return { error: e };
	}
};

const checkPermission = async (id) => {
	const user = await getUserById(id);

	if (!user.roles.includes('Admin')) {
		return null;
	}

	return true;
};

const generateToken = (data, secret = 'secret') =>
	jwt.sign({ data }, secret, { expiresIn: '7d' });

module.exports = {
	getUserById,
	getUserByData,
	createUser,
	generateToken,
	getMovies,
	unLikeMovie,
	likeMovie,
	checkPermission,
};
