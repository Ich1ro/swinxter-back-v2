const replyModel = require('../Model/reply');
const eventModel = require('../Model/event');
const userModel = require('../Model/usersModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Mailsend = require('../helper/mail');
const nodemailer = require('nodemailer');
const { S3Manager } = require('../utils/s3');
module.exports = {
	async createEvent(req, res) {
		try {
			console.log(req.body);
			const {
				eventName,
				Startdate,
				EndDate,
				accepted_type,
				location,
				geometry,
				description,
				type,
			} = req.body;
			if (
				(!eventName,
				!accepted_type,
				!Startdate,
				!EndDate,
				!location,
				!description,
				!geometry,
				!type)
			) {
				return res.status(400).send('Required data is missing.');
			}
			var mainImage;
			if (req.files && req.files['mainImage']) {
				for (const uploadedImage of req.files['mainImage']) {
					const imageUrl = await S3Manager.put(
						`event_${eventName}`,
						uploadedImage
					);
					mainImage = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageUrl}`;
				}
			}
			console.log(req.files, 'ALL FILES');
			let images = [];
			let videos = [];
			if (req.files['images']) {
				for (const image of req.files['images']) {
					const imageUrl = await S3Manager.put(`event_${eventName}`, image);
					images.push(
						`https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageUrl}`
					);
				}
			}
			if (req.files['videos']) {
				for (const video of req.files['videos']) {
					const imageUrl = await S3Manager.put(`event_${eventName}`, video);
					videos.push(
						`https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageUrl}`
					);
				}
			}
			const t = JSON.parse(accepted_type);
			console.log(t);
			const data = await eventModel.create({
				...req.body,
				accepted_type: t,
				images: images,
				mainImage: mainImage,
				videos: videos,
				location: JSON.parse(location),
				geometry: JSON.parse(geometry),
				userId: req.body.userId,
			});
			if (!data) {
				return res.status(400).send('something went wrong');
			} else {
				const mailOptions = {
					from: process.env.Nodemailer_id,
					to: process.env.Nodemailer_admin,
					subject: 'New Event Created',
					html: `<h4>
            Dear Admin,
            A new event request has been submitted for approval. The event name is ${eventName}.
            Please review the request and take appropriate action.
            Best regards,
            The Event Management Team</h4>`,
				};
				console.log('Notification email sent to admin');
				await Mailsend(req, res, mailOptions);
				return res
					.status(201)
					.send({ message: 'Event request submitted for approval.' });
			}
		} catch (e) {
			console.log(e);
			return res.status(500).send(e);
		}
	},
	async event_verify(req, res) {
		try {
			const { eventId } = req.params;
			const { status } = req.body;
			if (!status) {
				return res.status(400).send('status Is Required');
			}
			if (!eventId) {
				return re.status(400).send('eventId  Is Required ');
			}
			const exist = await eventModel
				.findOne({ _id: eventId })
				.populate('userId', 'username image email');
			if (!exist) {
				return res.status(400).send('event not exist');
			}
			let text = '';
			if (status == 'accept') {
				text = 'Congratulations! Your account registration has been accepted.';
			} else {
				text = 'Your account registration has been rejected.';
			}
			let email = exist.userId.email;
			console.log(email);

			const mailOptions = {
				from: process.env.Nodemailer_id,
				to: email,
				subject: 'Account registration',
				html: `<h4>${text}</h4>`,
			};
			if (status == 'accept') {
				const data = await eventModel.findOneAndUpdate(
					{ _id: exist._id },
					{ isverify: true },
					{ new: true }
				);
				Mailsend(req, res, mailOptions);
				return res.status(200).send('Acceptance email sent successfully');
			} else if (status == 'reject') {
				const data = await eventModel.findByIdAndDelete(
					{ _id: exist._id },
					{ new: true }
				);
				Mailsend(req, res, mailOptions);
				return res.status(200).send('Rejection email sent successfully');
			} else {
				return res.status(400).send('something went wrong');
			}
		} catch (e) {
			return res.status(500).send(e);
		}
	},
	async get_all_events(req, res) {
		try {
			const data = await eventModel.find({});
			return res.status(200).send(data);
		} catch (error) {
			return res.status(500).send(error);
		}
	},
	async verify_event(req, res) {
		try {
			const { id } = req.params;
			const { suspend } = req.body;

			if (suspend) {
				await eventModel.findOneAndUpdate(
					{ _id: id },
					{ isverify: false },
					{ new: true }
				);
			} else {
				const event = await eventModel.findById(id);
				if (!event) {
					return res.status(404).send({ message: 'Event not found' });
				}
				event.isverify = true;
				await event.save();
			}

			const updatedEvents = await eventModel.find();

			res.status(200).send(updatedEvents);
		} catch (error) {
			console.error('Error verifying event:', error);
			res.status(500).send({ message: 'Internal server error' });
		}
	},
	async find(req, res) {
		try {
			const { q } = req.query;
			const data = await eventModel.find().populate('userId', 'image username');
			const total = await eventModel.count();
			console.log(total, 'total');
			if (q) {
				let result = await eventModel
					.find({
						$or: [
							{ eventName: { $regex: q, $options: 'i' } },
							{ type: { $regex: q, $options: 'i' } },
							{ location: { $regex: q, $options: 'i' } },
							{ userId: q },
						],
					})
					.populate('userId', 'image username');
				console.log(q, result);

				return res.status(200).send({ data: result, total: total });
			}
			res.status(200).send({ data, total: total });
		} catch (e) {
			console.log(e);
			return res.status(500).send(e);
		}
	},
	async get_event(req, res) {
		try {
			const { eventId } = req.params;
			const data = await eventModel
				.findOne({ _id: eventId })
				.populate('userId', 'image username');
			if (!data) {
				return res.status(400).send('something went wrong');
			} else {
				return res.status(200).send(data);
			}
		} catch (e) {
			console.log(e);
			return res.status(500).send(e);
		}
	},
	async get_participants_by_eventId(req, res) {
		try {
			const { eventId } = req.params;
			const data = await eventModel.findById({ _id: eventId });

			if (data) {
				if (data.participants.length !== 0) {
					const usersIds = data.participants.map(
						participant => participant.user
					);
					const users = await userModel.find({ _id: { $in: usersIds } });
					return res.status(200).send(users);
				} else {
					return res.status(200).send([]);
				}
			} else {
				return res.status(400).send('something went wrong');
			}
		} catch (e) {
			console.log(e);
			return res.status(500).send(e);
		}
	},
	async update_event(req, res) {
		try {
			const { eventId } = req.params;
			if (!eventId) {
				return res.status(404).send('required the eventId');
			}

			const exist = await eventModel.findOne({ _id: eventId });
			if (!exist) {
				return res.status(404).send('event not found');
			}

			var mainImage;
			if (req.files && req.files['mainImage']) {
				for (const uploadedImage of req.files['mainImage']) {
					mainImage = process.env.Backend_URL_Image + uploadedImage.filename;
				}
			}

			let images = [];
			let videos = [];
			if (req.files['images']) {
				for (const image of req.files['images']) {
					images.push(`${process.env.Backend_URL_Image}${image.filename}`);
				}
			}
			if (req.files['videos']) {
				for (const video of req.files['videos']) {
					videos.push(`${process.env.Backend_URL_Image}${video.filename}`);
				}
			}
			if (Array.isArray(req.body?.images)) {
				req.body?.images.map(el => images.push(el));
			} else {
				images.push(req.body?.images);
			}
			if (Array.isArray(req.body?.videos)) {
				req.body?.videos.map(el => videos.push(el));
			} else {
				videos.push(req.body?.videos);
			}

			const t = JSON.parse(req.body.accepted_type);
			const t2 = JSON.parse(req.body.location);
			const data = await eventModel.findOneAndUpdate(
				{ _id: eventId },
				{
					...req.body,
					images: images,
					accepted_type: t,
					location: JSON.parse(req.body.location),
					geometry: JSON.parse(req.body.geometry),
					mainImage: mainImage,
					videos: videos,
				},
				{ new: true }
			);
			if (!data) {
				return res.status(400).send('something went wrong');
			} else {
				return res.status(200).send(data);
			}
		} catch (e) {
			console.log(e);
			return res.status(500).send(e);
		}
	},
	async delete_event(req, res) {
		try {
			const { eventId } = req.params;

			if (!eventId) {
				return res.status(400).send('EventId is required!');
			}

			const exist = await eventModel.findOne({ _id: eventId });
			if (!exist) {
				return res.status(404).send("Event doesn't exist");
			}

			await eventModel.findByIdAndDelete(eventId);

			const updatedEvents = await eventModel.find();
			res.status(200).send(updatedEvents);
		} catch (error) {
			console.error('Error deleting event:', error);
			res.status(500).send(error);
		}
	},
	async delPart(req, res) {
		try {
			let eventId = req.body.eventId;
			let userId = req.body.userId;
			if (!req.body.eventId) {
				return res.status(404).send('EventId is required!');
			}
			if (!req.body.userId) {
				return res.status(404).send('userId is required!');
			}

			let result = await eventModel.findOneAndUpdate(
				{ _id: eventId },
				{ $pull: { participants: { user: userId } } },
				{ new: true }
			);

			if (!result || result == null) {
				return res.status(400).send('Something went wrong!');
			}

			return res.status(200).send('Participant is deleted successfully');
		} catch (e) {
			console.log(e);
			return res.status(500).send(e);
		}
	},
	async requestParticipant(req, res, next) {
		try {
			console.log(req.user._id);
			const { eventId } = req.params;
			// console.log("Event ID:", eventId);
			const event = await eventModel.findById(eventId);
			// console.log("Event:", event);
			if (!event) {
				return res.status(404).send('Event not found');
			}

			const userIdString =
				req.user && req.user._id ? req.user._id.toString() : null;
			console.log('UserID String:', userIdString);
			const participantExists = event.participants.find(
				participant =>
					participant.user && participant.user.toString() === userIdString
			);
			console.log('Participant Exists:', participantExists);

			if (participantExists) {
				return res.status(400).send('Participant already added');
			}
			if (event.type == 'Public Event') {
				event.participants.push({ user: req.user._id, status: 'Approved' });
				await event.save();
				return res.status(200).send(event);
			}
			event.participants.push({ user: req.user._id });
			await event.save();
			res.status(200).send('Participant request sent successfully');
		} catch (error) {
			console.error(error);
			return next(error);
		}
	},
	async updateParticipantStatus(req, res, next) {
		const { eventId, userId } = req.params;
		const { status } = req.body;
		try {
			const event = await eventModel.findById(eventId);
			if (!event) {
				return res.status(404).send('Event not found');
			}
			const participant = event.participants.find(
				p => p.user.toString() === userId
			);
			console.log(participant);
			if (!participant) {
				return res.status(404).send('user not found');
			}
			if (status == 'Rejected') {
				event.participants.pull({ user: userId });
				await event.save();
				return res.status(200).send(event);
			} else if (status == 'Approved') {
				participant.status = 'Approved';
				await event.save();
				return res.status(200).send(event);
			}
		} catch (error) {
			console.error(error);
			return next();
		}
	},
	async postComments(req, res) {
		const eventId = req.body.eventId;
		const data = {
			username: req.body.username,
			userPhoto: req.body.userPhoto,
			comment: req.body.comment,
			userId: req.body.userId,
		};
		try {
			await eventModel.findOneAndUpdate(
				{
					_id: eventId,
				},
				{
					$push: {
						comments: data,
					},
				}
			);
			res.status(200).send('Comment added');
		} catch (e) {
			res.status(403).send('Encountered some error', e);
			console.log(e);
		}
	},
	async postReply(req, res) {
		const eventId = req.body.eventId;
		const data = {
			userId: req.body.userId,
			reply: req.body.reply,
			replyPhoto: req.body.replyPhoto,
			replyName: req.body.replyName,
		};
		try {
			await eventModel.findOneAndUpdate(
				{
					_id: eventId,
				},
				{
					$push: {
						replies: data,
					},
				}
			);
			res.status(200).send('Comment added');
		} catch (e) {
			res.status(403).send('Encountered some error', e);
			console.log(e);
		}
	},
};
