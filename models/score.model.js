const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "User" },
	quiz: [{ quizName: String, scores: [{ type: Number }], highScore: Number }],
});

module.exports = mongoose.model("Score", scoreSchema);
