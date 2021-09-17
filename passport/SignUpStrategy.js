const LocalStrategy = require('passport-local').Strategy;
const { getUserByData, createUser } = require('../controllers/user.controller');

module.exports = (passport) =>
	passport.use(
		'local-signup',
		new LocalStrategy(
			{ usernameField: 'email' },
			async (email, password, done) => {
				let user = await getUserByData({ email });

				if (user) {
					return done(
						null,
						false,
						'This email is already linked to an existing account!'
					);
				}

				user = await createUser({
					email,
					password,
				});

				return done(null, user, 'User has been registered successfully!');
			}
		)
	);
