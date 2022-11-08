//connect to mongodb atlas
const mongoose = require("mongoose");
const db = process.env.MONGO_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://Neil:Neil%401234@impact.64nojpm.mongodb.net/?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		console.log("MongoDB Connected...");
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB