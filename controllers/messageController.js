const Message = require("../models/message");

exports.message_list = (req, res) => {
	res.render("index", { title: "Posts" });
};

// messages home GET Page (dashboard)
exports.dashboard = (req, res) => {
	res.render("dashboard", { title: "dashboard" });
};

// user message POST
exports.message_post = (req, res) => {
	res.render("dashboard", { title: "User message Post route" });
};

// secret message page GET
exports.secret_message_get = (req, res) => {
	res.render("secret", { title: "Secret Form" });
};

// secret message page POST
exports.secret_message_post = (req, res) => {
	res.render("secret", { title: "secret post" });
};
