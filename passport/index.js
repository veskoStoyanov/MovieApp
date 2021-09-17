module.exports = (passport) => {
	require('./LocalStrategy')(passport);
	require('./JWTStrategy')(passport);
	require('./SignUpStrategy')(passport);
	require('./AdminJWTStrategy')(passport);
};
