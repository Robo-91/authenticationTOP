require("dotenv").config();
const Message = require("../models/message");
const User = require("../models/user");

const secretMessage = process.env.SECRET;

exports.message_list = async (req, res) => {
	try {
		const messages = await Message.find();

		res.render("index", { title: "Posts", messages });
	} catch (e) {
		console.log(e);
	}
};

// user message POST
exports.message_post = async (req, res) => {
	let errors = [];
	try {
		const duplicateMessage = await Message.findOne({
			description: req.body.message,
		});

		if (duplicateMessage !== null) {
			errors.push({ message: "You have already submitted this message!" });
			res.render("dashboard", { title: "Dashboard", user: req.user });
		} else {
			const newMessage = new Message({
				description: req.body.message,
				owner: req.user._id,
			});

			await newMessage.save();
			res.redirect("/");
		}
	} catch (e) {
		console.log(e);
	}
};

// secret message page GET
exports.secret_message_get = (req, res) => {
	console.log(secretMessage);
	res.render("secret", { title: "Secret Form" });
};

// secret message page POST
exports.secret_message_post = (req, res) => {
	res.render("secret", { title: "secret post" });
};
