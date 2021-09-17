const passport = require('passport');
const {
	getAllMovies,
	getMovieById,
	addMovie,
	editMovie,
	removeMovie,
} = require('../controllers/movie.controller');

const getMovies = async (req, res, next) => {
	passport.authenticate(
		'jwt-strategy',
		{ session: false },
		async (err, user) => {
			if (err) {
				return next(err);
			}

			if (!user) {
				return res.status(400).json({ errors: [err] });
			}
			let movies = [];

			try {
				movies = await getAllMovies();
			} catch (e) {
				console.log(e);
				return res.status(400).json({ success: false, errors: [''] });
			}

			return res.status(200).json(movies);
		}
	)(req, res, next);
};

const getMovie = async (req, res, next) => {
	passport.authenticate(
		'jwt-strategy',
		{ session: false },
		async (err, user) => {
			if (err) {
				return next(err);
			}

			if (!user) {
				return res.status(400).json({ errors: [err] });
			}

			let movie = null;

			try {
				movie = await getMovieById(req.params.id);
			} catch (e) {
				console.log(e);
				return res.status(400).json({ success: false, errors: [''] });
			}

			return res.status(200).json(movie);
		}
	)(req, res, next);
};

const createMovie = async (req, res, next) => {
	passport.authenticate(
		'admin-strategy',
		{ session: false },
		async (err, user) => {
			if (err) {
				return next(err);
			}

			if (!user) {
				return res.status(400).json({ errors: [err] });
			}

			let movie = null;

			try {
				movie = await addMovie(req.body);
			} catch (e) {
				console.log(e);
				return res.status(400).json({ success: false, errors: [''] });
			}

			return res.status(200).json(movie);
		}
	)(req, res, next);
};

const updateMovie = async (req, res, next) => {
	passport.authenticate(
		'admin-strategy',
		{ session: false },
		async (err, user) => {
			if (err) {
				return next(err);
			}

			if (!user) {
				return res.status(400).json({ errors: [err] });
			}

			let movie = null;

			try {
				movie = await editMovie(req.params.id, req.body);
			} catch (e) {
				console.log(e);
				return res.status(400).json({ success: false, errors: [''] });
			}

			return res.status(200).json(movie);
		}
	)(req, res, next);
};

const deleteMovie = async (req, res, next) => {
	passport.authenticate(
		'admin-strategy',
		{ session: false },
		async (err, user) => {
			if (err) {
				return next(err);
			}

			if (!user) {
				return res.status(400).json({ errors: [err] });
			}

			let movie = null;

			try {
				const { error, id } = await removeMovie(user, req.params.id);

				if (error) {
					return res.status(400).json({ success: false, errors: [error] });
				}

				movie = id;
			} catch (e) {
				console.log(e);
			}

			return res.status(200).json({ movie });
		}
	)(req, res, next);
};

module.exports = {
	getMovies,
	getMovie,
	createMovie,
	deleteMovie,
	updateMovie,
};
