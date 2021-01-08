const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

const memoSchema = mongoose.Schema({
	seq: {
		type: Number,
		default: 0,
	},
	description: {
		type: String,
		maxlength: 150,
	},
});

memoSchema.plugin(autoIncrement.plugin, {
	model: "memos",
	field: "seq",
	startAt: 1,
	increment: 1,
});

const Memo = mongoose.model("Memo", memoSchema);

module.exports = { Memo };
