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
		type: Array,
		required: true,
	},

	description: {
		type: String,
		required: true,
		trim: true,
	},

	span: {
		type: String,
		required: true,
		trim: true,
	},

	rating: {
		type: Number,
		default: 0,
	},

	url: {
		type: String,
		trim: true,
	},
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
