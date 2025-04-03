const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	page: {
		type: String,
	},
	imgUrl: {
		type: String,
	},
	active: {
		type: Boolean,
	},
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessUser" },
	isApprove: { type: Boolean, default: false },
	isPaid: { type: Boolean, default: false },
});

const bannerModel = mongoose.model('banner', bannerSchema);

module.exports = bannerModel;
