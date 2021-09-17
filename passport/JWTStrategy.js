const JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
	const opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = 'secret';
	passport.use(
		'jwt-strategy',
		new JwtStrategy(opts, async (jwt_payload, done) => {
			done(null, jwt_payload.data);
		})
	);
};
