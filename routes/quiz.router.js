const express = require("express");
const { getQuiz, postQuiz } = require("../controllers/quiz.controller");
const router = express.Router();
const Quiz = require("../models/quiz.model");

router.route("/").get(getQuiz);

router.post("/").post(postQuiz);

module.exports = router;
