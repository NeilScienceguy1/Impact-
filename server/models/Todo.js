const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	dueDate: {
		type: String,
		required: true,
	},
	tags: {
		type: Array,
	},
	author: {
		type: String
	}
}, {timestamps: true});

module.exports = mongoose.model("Todo", todoSchema);