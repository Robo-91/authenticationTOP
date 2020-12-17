require("dotenv").config();
const Message = require("../models/message");
const User = require("../models/user");

exports.message_list = async (req, res) => {
	const currentUser = req.user;
	try {
		const messages = await Message.find();
		const authors = await User.find({ id: messages.owner });
		console.log(typeof messages[0].owner.toString());
		console.log(typeof authors[0].id);

		res.render("index", { title: "Posts", messages, currentUser, authors });
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
	res.render("secret", { title: "Secret Form" });
};

// secret message page POST
exports.secret_message_post = async (req, res) => {
	let errors = [];
	const secretMessage = process.env.SECRET;

	if (req.body.secret === secretMessage) {
		const user = await User.findById(req.user._id);
		user.membership_status = true;
		await user.save();
		res.redirect("/");
	} else {
		errors.push({
			message: "Incorrect Input for secret message",
		});
		res.render("secret", { title: "Secret Form", errors });
	}
};
