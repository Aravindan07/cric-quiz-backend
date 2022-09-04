const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
	question: String,
	imageUrl: String,
	correctAnswer: String,
	options: [{ name: String, correct: Boolean }],
	category: String,
	difficulty: String,
});

module.exports = mongoose.model("Quiz", quizSchema);
