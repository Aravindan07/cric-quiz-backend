const express = require("express");
const router = express.Router();
const { userRegister, userLogin, loadUser } = require("../controllers/user.controller");
const { checkAuth } = require("../middlewares/checkAuth");

// Signup
router.route("/register").post(userRegister);

// Login
router.route("/login").post(userLogin);

// load User
router.route("/").all(checkAuth).get(loadUser);

module.exports = router;
