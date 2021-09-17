const { Movie } = require('../models');

// attention not to invoke movie controller into user controller circular dependency will occur
const { unLikeMovie } = require('./user.controller');

const getAllMovies = () => Movie.find();

const getMovieById = (id) => Movie.findById(id);

const addMovie = (data) => Movie.create(data);

const editMovie = async (id, data) => {
	try {
		const movie = await getMovieById(id);
		Object.keys(data).forEach((key) => {
			movie[key] = data[key];
		});

		return movie.save();
	} catch (e) {
		console.log(e);
		return { error: e };
	}
};

const removeMovie = async (userId, movieId) => {
	try {
		await Movie.deleteOne({ _id: movieId });
		await unLikeMovie(userId, movieId);
		return { id: movieId };
	} catch (e) {
		return { error: e };
	}
};

module.exports = {
	getAllMovies,
	getMovieById,
	addMovie,
	editMovie,
	removeMovie,
};
