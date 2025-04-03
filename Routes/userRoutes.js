const express = require('express');
const { connect } = require('getstream');
const StreamChat = require('stream-chat').StreamChat;
const user = require('../Controller/userController');
const router = express.Router();

const apiKey = '5npkzfpcxuh8';
const apiSecret =
	'5x4psrh4mya9jmsxux7kxagf9wyz32jb4qmh8nbktfj7db3x7mb82uxndychggma';
const appId = '1267706';

const {
	verifyToken,
	verifyAdmin,
	verifyUser,
	verifyModel,
	verifyTokenActive,
} = require('../helper/middleware');

const userController = require('../Controller/userController');
const upload = require('../helper/multer');
console.log(upload);
router.post('/register', user.signup);
router.get('/get_banner_by_page/:page', user.getBannersByPage);
router.post('/login', user.login);
router.post('/login4', user.login4);
router.get('/active', verifyToken, user.userLoggedIN);
router.get('/active_users', user.activeUsers);
router.get('/recent_users', user.RecentUsers);
router.post(
	'/upload_album',
	verifyModel,
	upload.any('album.images'),
	user.upload_album
);
router.post(
	'/add_img_album/:albumId',
	verifyModel,
	upload.any('album.images'),
	user.add_img_album
);
router.put('/deleteAlbum/:albumId', verifyModel, user.deleteAlbum);
router.put('/del_img_album/:albumId', verifyModel, user.del_img_album);
router.post('/model_mail', verifyModel, user.model_mail);
router.post('/user_verify/:id', user.user_verify);
router.post('/forget', user.forget);
router.post('/verifyOtp', user.verifyOtp);
router.post('/reset_pass', user.reset_pass);
router.get('/findOne/:id', user.findOne);
router.get('/situationships_by_user_id/:userId', user.getSituationshipById);
router.put(
	'/update',
	upload.fields([
		{ name: 'images', maxCount: 1000 * 100 * 10 },
		{ name: 'image', maxCount: 1 },
		{ name: 'videos', maxCount: 1000 * 100 * 10 },
	]),
	userController.createUserInfo
);
router.put(
	'/update-user',
	upload.fields([
		{ name: 'images', maxCount: 1000 * 100 * 10 },
		{ name: 'image', maxCount: 1 },
		{ name: 'videos', maxCount: 1000 * 100 * 10 },
	]),
	userController.update
);
router.post(
	'/update-user-membership/:userId',
	userController.updateUserMembership
);
router.delete('/delete_user/:id', user.delete_user);
router.get('/search_user', user.search_user);
router.post('/logout/:id', user.logout);
router.put('/changePassword', verifyToken, user.changePassword);
router.post('/contactUs', user.contactUs);
router.get('/userdetail/:id', user.userdetail);
router.get('/userverify/:id', user.userverify);
router.post('/subscribe/:modelId', verifyUser, user.subscribe);
router.put(
	'/upload_image/:userId',
	upload.fields([
		{ name: 'images', maxCount: 1000 * 100 * 10 },
		{ name: 'image', maxCount: 1 },
		{ name: 'videos', maxCount: 1000 * 100 * 10 },
	]),
	user.upload_image
);
router.put(
	'/upload_media/:userId',
	upload.fields([
		{ name: 'images', maxCount: 1000 * 100 * 10 },
		{ name: 'image', maxCount: 1 },
		{ name: 'videos', maxCount: 1000 * 100 * 10 },
	]),
	user.upload_media
);
router.put(
	'/upload_video/:userId',
	upload.fields([
		{ name: 'images', maxCount: 1000 * 100 * 10 },
		{ name: 'image', maxCount: 1 },
		{ name: 'video', maxCount: 1 },
		{ name: 'videos', maxCount: 1000 * 100 * 10 },
	]),
	user.upload_video
);

router.post('/delete_media/:userId', user.delete_media);
router.post('/delete_video/:userId', user.delete_video);
router.post('/update_media/:userId/:type', user.update_media);

router.post('/addwallet/:id', verifyUser, user.addwallet);
router.get('/getfavModel/:userId', user.getfavModel);
router.post('/favModel/:modelId', verifyToken, user.favModel);
router.post('/auth/getstream', async (req, res) => {
	const { userId } = req.body;
	const serverClient = connect(apiKey, apiSecret, appId);
	const client = StreamChat.getInstance(apiKey, apiSecret);
	const { users } = await client.queryUsers({ id: userId });
	if (!users.length) {
		const userToken = serverClient.createUserToken(userId);
		return res.json({ token: userToken });
	} else {
		const userToken = serverClient.createUserToken(users[0].id);
		return res.json({ token: userToken });
	}
});
router.post('/visited-users', userController.visitedUsers);
router.post('/delete_notification/:id', userController.delete_notification);
router.get('/zego_token', userController.zegoToken);
router.get('/user_details/:id', userController.userdetail);
router.get('/recentusers', userController.RecentUsers);
router.get('/users', userController.allUsers);
router.get('/near-users/:lon/:lat/:radius', userController.nearUsers);
router.put('/remove_friend/:id/:friendId', userController.removeFriend);
router.put('/send_request/:id/:friendId', userController.sendFriendRequest);
router.put('/cancel_request/:id/:friendId', userController.cancelFriendRequest);
router.put('/accept_req/:id/:friendId', userController.accept_req);
router.put('/decline_req/:id/:friendId', userController.decline_req);
router.post('/blockuser', userController.blockUser);
router.post('/add_visitor/:id', userController.add_visitors);
router.post('/unblockuser', userController.unblockUser);
router.post('/superlike', userController.superlike);
router.post('/remove-superlike', userController.removeSuperlike);
router.post('/notifications', userController.sendNotification);
router.get('/notifications/:userId', userController.getNotifications);
router.post('/get-friends', userController.getFriends);
router.get('/notifications-status/:id', userController.readNotification);
router.post('/set-notifications/:userId', userController.setNotificationCount);
router.post('/create-subscription', userController.add_subscription);
router.post('/advanced-search', userController.advancedSearch);
router.post('/approve_user/:id', userController.approveUser);
router.post('/approve_banner/:id', userController.approveBanner);
router.post('/verify-user-acc/:id', userController.verifyUserAccount);
router.get(
	'/verification-payment-success/:id',
	userController.userVerificationPayment
);
router.get(
	'/banner-payment-success/:id',
	userController.bannerPaymentSuccess
);
router.post(
	'/create-banner',
	upload.fields([{ name: 'mainImage' }]),
	userController.createBanner
);
router.get('/get-banners/:id', userController.getBanners);
router.get('/banner-payment_success', userController.bannerPayment);

router.post('/send_dummy_emails', userController.sendDummyEmails);

module.exports = router;
