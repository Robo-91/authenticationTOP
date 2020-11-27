const User = require("../models/user");

// login GET
exports.login = (req, res) => {
	res.render("login", { title: "login Page" });
};

// login POST
exports.login_post = (req, res) => {
	res.render("login", { title: "login Page" });
};

// Signup GET
exports.sign_up = (req, res) => {
	res.render("signup", { title: "Sign Up" });
};

// Signup POST
exports.sign_up_post = (req, res) => {
	res.render("signup", { title: "Sign Up" });
};

// dashboard
exports.dashboard = (req, res) => {
	res.render("dashboard", { title: "Dashboard" });
};
