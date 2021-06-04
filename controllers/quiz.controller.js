const Quiz = require("../models/quiz.model");

const getQuiz = async (req, res) => {
	const { category } = req.query;
	try {
		if (category === "random") {
			const questions = await Quiz.find({}).select("-__v");
			return res.status(200).json({ message: "Fetched successfully!", questions });
		}
		const questions = await Quiz.find({ category }).select("-__v");
		res.status(200).json({ message: "Fetched successfully!", questions });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch data" });
	}
};

const postQuiz = async (req, res) => {
	const { question, correctAnswer, options, category, difficulty } = req.body;
	try {
		const newQuiz = new Quiz({ question, options, correctAnswer, category, difficulty });
		let result = await newQuiz.save();
		res.status(201).json({ questions: result });
	} catch (error) {
		console.error(error);
	}
};

module.exports = { getQuiz, postQuiz };
