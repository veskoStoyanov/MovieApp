const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	yearMade: {
		type: Number,
		required: true,
	},
	genres: {
		type: String,
		required: true,
		trim: true
	},

	description: {
		type: String,
		required: true,
		trim: true,
	},

	span: {
		type: Number,
		required: true
	},

	rating: {
		type: Number,
		default: 0,
	},

	image: {
		type: String,
		trim: true,
	},

	url: {
		type: String,
		trim: true,
	},
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
