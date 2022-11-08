const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
    color: {
        type: String,
        required: true
    },
    author: {
        type: String
    }
});

module.exports = mongoose.model("Tag", tagSchema);