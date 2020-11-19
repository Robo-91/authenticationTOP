const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
	{
		description: {
			type: String,
			required: true,
			trim: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

// reference to user who wrote message
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
