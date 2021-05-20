const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
	question: String,
	imageUrl: String,
	correctAnswer: String,
	options: [{ type: String }],
	category: String,
	difficulty: String,
});

module.exports = mongoose.model("Quiz", quizSchema);
