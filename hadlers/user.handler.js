const passport = require('passport');
const {
	generateToken,
	getMovies,
	unLikeMovie,
	likeMovie,
} = require('../controllers/user.controller');

const registerUser = (req, res, next) => {
	passport.authenticate(
		'local-signup',
		{ session: false },
		async (err, user, message) => {
			if (err || !user) {
				return res
					.status(401)
					.send({ message: message || 'Not Authenticated' });
			}

			return res.status(200).send({ user });
		}
	)(req, res, next);
};

const loginUser = (req, res, next) => {
	passport.authenticate(
		'local-signin',
		{ session: false },
		async (err, user, message) => {
			if (err || !user) {
				return res
					.status(401)
					.send({ message: message || 'Not Authenticated' });
			}

			const token = await generateToken(user._id);

			return res.status(200).send({ user, token });
		}
	)(req, res, next);
};

const logoutUser = async (req, res, next) => {
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

			return res.status(200).json({ success: true });
		}
	)(req, res, next);
};

const getFavoriteMovies = async (req, res, next) => {
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
				const { movies: userMovies } = await getMovies(user);
				movies = userMovies;
			} catch (e) {
				return res.status(400).json({ errors: [err] });
			}

			return res.status(200).json(movies);
		}
	)(req, res, next);
};

const likeFavoriteMovie = async (req, res, next) => {
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
				const { error, userMovies } = await likeMovie(user, req.params.id);
				if (error) {
					return res.status(400).json({ errors: [error] });
				}
				movies = userMovies;
			} catch (e) {
				return res.status(400).json({ errors: [err] });
			}

			return res.status(200).json(movies);
		}
	)(req, res, next);
};

const unlikeFavoriteMovie = async (req, res, next) => {
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
				const { error, userMovies } = await unLikeMovie(user, req.params.id);
				if (error) {
					return res.status(400).json({ errors: [error] });
				}
				movies = userMovies;
			} catch (e) {
				return res.status(400).json({ errors: [err] });
			}

			return res.status(200).json(movies);
		}
	)(req, res, next);
};

module.exports = {
	loginUser,
	logoutUser,
	registerUser,
	getFavoriteMovies,
	likeFavoriteMovie,
	unlikeFavoriteMovie,
};
