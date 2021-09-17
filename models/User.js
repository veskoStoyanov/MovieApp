const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const USER_TYPES = ['USER', 'SUPER_USER', 'ADMIN'];

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	roles: {
		type: Array,
		default: ['User'],
		// an error occurs
		// enum: USER_TYPES
	},
	movies: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Movie',
		},
	],
});

UserSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
		this.password = await bcrypt.hash(this.password, salt);
		return;
	}

	next();
});

UserSchema.methods.matchPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
