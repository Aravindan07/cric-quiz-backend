const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");
const User = require("../models/user.model");

const userRegister = async (req, res) => {
	const { name, email, password } = req.body;

	const checkValidation = validator.validate(email);

	// Simple validation
	if (!name || !email || !password) {
		return res.status(400).json({ message: "Please Enter all fields" });
	}
	try {
		if (checkValidation === false) {
			return res.status(400).json({ message: "Entered email is not in the valid format" });
		} else {
			// check for existing user
			const user = await User.findOne({ email: email });
			if (user) {
				return res.status(400).json({ message: "This user already exists" });
			}
			const newUser = new User({ name: name, email: email, password: password });

			// creating salt and hash
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, async (err, hash) => {
					if (err) {
						throw new Error(err);
					}

					newUser.password = hash;

					const savedUser = await newUser.save();
					jwt.sign(
						{ id: savedUser._id },
						process.env.JWTSECRET,
						{ expiresIn: "24h" },
						(err, token) => {
							if (err) {
								throw new Error(err);
							}
							savedUser.password = undefined;
							savedUser.__v = undefined;
							res.status(201).json({
								message: "User created Successfully",
								token,
								user: savedUser,
							});
						}
					);
				});
			});
		}
	} catch (error) {
		console.error(error);
		res.json(500).json({ message: "An error occurred" });
	}
};

const userLogin = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: "Please enter all fields" });
	}
	const checkValidation = validator.validate(email);
	if (checkValidation === false) {
		return res.status(400).json({ message: "Entered email is not in the valid format" });
	}
	try {
		const user = await User.findOne({ email }).select("-__v").populate("userScores");
		if (!user) {
			return res.status(404).json({ message: "User does not exist" });
		}

		// Validate password
		const checkPassword = await bcrypt.compare(password, user.password);
		if (checkPassword === false) {
			return res.status(400).json({ message: "Invalid Credentials!" });
		}
		const JwtSecretKey = process.env.JWTSECRET;
		jwt.sign({ id: user._id }, JwtSecretKey, { expiresIn: "24h" }, (err, token) => {
			if (err) {
				throw new Error(err);
			}
			user.password = undefined;
			res.status(200).json({ message: "You are logged in", token, user });
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred" });
	}
};

const loadUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id)
			.select("-password -createdAt -updatedAt -__v")
			.populate("userScores");
		return res.status(200).json({ user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred" });
	}
};

module.exports = { userRegister, userLogin, loadUser };
