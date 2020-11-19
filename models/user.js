const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema(
	{
		first_name: {
			type: String,
			required: true,
			trim: true,
		},
		last_name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Invalid Email");
				}
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
			validate(value) {
				if (value.toLowerCase() === "password" || value.length < 6) {
					throw new Error("Invalid Password");
				}
			},
		},
		membership_status: {
			type: Boolean,
			default: false,
		},
	}
);

// First name, last name, email, password, membership status
const User = mongoose.model("User", userSchema);
module.exports = User;
