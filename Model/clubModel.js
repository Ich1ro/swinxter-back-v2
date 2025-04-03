const mongoose = require('mongoose');

const GeoSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['Point'],
	},
	coordinates: [Number]
});

const ClubSchema = new mongoose.Schema(
	{
		mainImage: {
			type: String,
			default:
				'https://thumbs.dreamstime.com/z/club-banner-round-brilliants-91976707.jpg',
		},
		ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		owner_name: { type: String },
		business_name: {
			type: String,
			required: true,
		},
		location: {
			state: { type: String },
			city: { type: String },
			country: { type: String },
			address: { type: String }
		},
		geometry: GeoSchema,
		description: {
			type: String,
		},
		image: [
			{
				type: String,
			},
		],
		video: [
			{
				type: String,
			},
		],
		comments: [
			{
				username: String,
				userPhoto: String,
				comment: String,
				rating: String,
				userId: String,
				timestamp: { type: Date, default: Date.now() },
			},
		],
		business_type: {
			type: String,
		},
		customer: [
			{
				user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
				payment: { type: Boolean, default: false },
			},
		],
		isverify: { type: Boolean, default: false },
		introduction: { type: String },
		contact: { type: String },
		email: { type: String },
		website: { type: String },
		reviews: [
			{
				title: String,
				rating: Number,
				created: { type: Date, default: Date.now() },
				desc: String,
				createdBy: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
			},
		],
	},
	{ timestamps: true }
);
ClubSchema.index({ geometry: '2dsphere' });

const Club = mongoose.model('Club', ClubSchema);

module.exports = Club;
