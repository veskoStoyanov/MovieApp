const { getUserByData } = require('../controllers/user.controller');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) =>
	passport.use(
		'local-signin',
		new LocalStrategy(
			{ usernameField: 'email' },
			async (email, password, done) => {
				const user = await getUserByData({ email });

				if (!user) {
					return done(true, false, 'Invalid Credentials!');
				}

				const isMatch = await user.matchPassword(password);

				if (!isMatch) {
					return done(true, false, 'Invalid Credentials!');
				}

				return done(null, user, 'User has been successfuly logged in!');
			}
		)
	);
