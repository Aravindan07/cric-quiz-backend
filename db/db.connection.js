const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.URI, {
			useCreateIndex: true,
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB connected on ${conn.connection.host}`);
	} catch (error) {
		console.error(error);
	}
};

module.exports = connectDB;
