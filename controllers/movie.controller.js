const { Movie } = require('../models');

// attention not to invoke movie controller into user controller circular dependency will occur
const { unLikeMovie, getUserById } = require('./user.controller');

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

const addMovieRating = async (movieId, data) => {
	try {
		const movie = await Movie.findById(movieId);
		const index = movie.rating.findIndex((rating) => rating.email === data.email);
		console.log(index);

		if (index > -1) {
			movie.rating.splice(index, 1, data);
		} else {
			movie.rating.push(data)
		}
		
		movie.markModified('rating');

		return movie.save();
	} catch (e) {
		console.log(e);
	}
}

module.exports = {
	getAllMovies,
	getMovieById,
	addMovie,
	editMovie,
	removeMovie,
	addMovieRating
};
