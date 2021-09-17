const { checkPermission } = require('../controllers/user.controller');

const JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
	const opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = 'secret';
	passport.use(
		'admin-strategy',
		new JwtStrategy(opts, async (jwt_payload, done) => {
			const isAuthorized = await checkPermission(jwt_payload.data);

			if (!isAuthorized) {
				return done(true, false, 'Invalid Credentials!');
			}

			done(null, jwt_payload.data);
		})
	);
};
