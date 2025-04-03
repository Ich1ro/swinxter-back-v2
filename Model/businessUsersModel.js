const { mongoose, Schema } = require('mongoose');

const BusinessUserSchema = new mongoose.Schema(
	{
		profile_type: {
			type: String,
			default: 'business',
		},
		// firstName: { type: String },
		// lastName: { type: String },
		email: { type: String, unique: true },
		username: { type: String, unique: true },
		password: { type: String },
		payment: {
			membership: { type: Boolean, default: false },
			last_payment: { type: String },
			membership_plan: { type: String },
			membership_expiry: { type: String },
			membership_price: { type: String },
			membership_pause: { type: Boolean, default: false },
		},
		image: { type: String, default: '' },
		paymentUser: { type: String },
		bannerId: { type: Schema.Types.ObjectId, ref: "bannerModel" },
		isVerify: { type: Boolean, default: false },
		isLogged: { type: Boolean, default: false },
		role: { type: String, default: 'business' },
		stream_token: { type: String },
	},
	{
		timestamps: true,
	}
);

const BusinessUser = mongoose.model('businessUser', BusinessUserSchema);

module.exports = BusinessUser;
