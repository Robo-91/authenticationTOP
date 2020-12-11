const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { deleteOne } = require("../models/user");

// login GET
exports.login = (req, res) => {
	res.render("login", { title: "Login" });
};

// Signup GET
exports.sign_up = (req, res) => {
	res.render("signup", { title: "Sign Up" });
};

// Signup POST
exports.sign_up_post = async (req, res) => {
	try {
		let errors = [];
		const duplicateUser = await User.findOne({ email: req.body.email });
		if (duplicateUser !== null) {
			errors.push({ message: "Email is already registered" });
			res.render("signup", { title: "Sign Up", errors });
		} else {
			const newUser = new User({
				first_name: req.body.firstname,
				last_name: req.body.lastname,
				email: req.body.email,
				password: req.body.password,
				membership_status: false,
			});

			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(newUser.password, salt, async (err, hash) => {
					newUser.password = hash;
					await newUser.save();
				});
			});

			res.redirect("/dashboard");
		}
	} catch (e) {
		console.log(e);
	}
};

// login POST
exports.login_post = (req, res, next) => {
	console.log(req.body.email);
	console.log(req.body.password);
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/login",
	})(req, res, next);
	// res.render("login", { title: "Login" });
};

// dashboard
exports.dashboard = (req, res) => {
	res.render("dashboard", { title: "Dashboard" });
};

// logout
exports.logout = (req, res) => {
	req.logOut();
	res.redirect("/login");
};
