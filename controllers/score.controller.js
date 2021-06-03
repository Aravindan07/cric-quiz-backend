const Score = require("../models/score.model");
const User = require("../models/user.model");
const { getMaximumNumberInArray } = require("../utils/helper");

const getUserDashboard = async (req, res) => {
	const { userId } = req.params;
	try {
		const foundUserScore = await Score.findOne({ userId });
		if (foundUserScore) {
			return res.status(200).json({ item: foundUserScore });
		}
		return res.status(404).json({ message: "User not found!" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "An error occurred" });
	}
};

const addScore = async (req, res) => {
	const { userId, quizName, score } = req.body;
	try {
		const foundUserScore = await Score.findOne({ userId }).select("-__v");
		const foundUser = await User.findById(userId).select("-__v");
		const checkQuizPresent =
			foundUserScore && foundUserScore.quiz.find((quiz) => quiz.quizName === quizName);
		if (foundUserScore) {
			if (checkQuizPresent) {
				console.log("inside CheckPresent", checkQuizPresent);
				foundUserScore.quiz.map((quiz) =>
					quiz.quizName === quizName
						? ((quiz.scores = [...quiz.scores, score]),
						  (quiz.highScore = getMaximumNumberInArray(quiz.scores)))
						: quiz
				);
				const newScore = await foundUserScore.save();
				newScore.__v = undefined;
				return res.status(201).json({ message: "Score added", item: newScore });
			}
			foundUserScore.quiz.push({ quizName, scores: [score], highScore: score });
			const newUserScore = await foundUserScore.save();
			newUserScore.__v = undefined;
			return res.status(201).json({ message: "Score added", item: newUserScore });
		}
		const newUserScore = new Score({
			userId,
			quiz: [{ quizName, scores: [score], highScore: score }],
		});
		const newScore = await newUserScore.save();
		newScore.__v = undefined;
		foundUser.userScores = newUserScore;
		await foundUser.save();
		return res.status(201).json({ message: "Score Added", item: newScore });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "An error occurred" });
	}
};

module.exports = { addScore, getUserDashboard };
