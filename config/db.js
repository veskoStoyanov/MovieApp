const mongoose = require('mongoose');

const User = require('../models/User');

const connectDB = async () => {
	const connection = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	await User.seedAdminUser();

	console.log(`MongoDB Connected: ${connection.connection.host}`);
};

module.exports = connectDB;
