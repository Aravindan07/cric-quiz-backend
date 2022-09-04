const express = require("express");
const router = express.Router();
const { addScore, getUserDashboard } = require("../controllers/score.controller");
const { checkAuth } = require("../middlewares/checkAuth");

router.route("/:userId/get-user-dashboard").all(checkAuth).get(getUserDashboard);

router.route("/:userId/add-score").all(checkAuth).post(addScore);

module.exports = router;
