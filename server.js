const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');
dotenv.config();
const PORT = process.env.PORT;
const db = require('./Connection/connection');
app.use(express.static('public'));
app.use('images', express.static('uploads'));
app.use('images', express.static('images'));
const path = require('path');
const clubroutes = require('./Routes/clubRoutes');
const userroutes = require('./Routes/userRoutes');
const event = require('./Routes/event');
const travel = require('./Routes/travel');
const affiliate = require('./Routes/affiliateRoutes');
const faq = require('./Routes/faq');
const adminRoutes = require('./Routes/adminRoutes');
const resort = require('./Routes/resort')
app.use(express.json());
var corsOptions = {
	origin: [
		'http://localhost:3000',
		'http://localhost:3001',
		'http://localhost:3002',
		'https://hot-date.vercel.app',
		'https://swinxter-v2.vercel.app',
		'https://swinxter-admin.vercel.app',
		'https://www.swinxter.com',
		'https://swinxter-front.vercel.app',
		'https://swinxter-admin-teal.vercel.app',
		'https://dev.swinxter.com',
		'https://app.swinxter.com',
	],
	credentials: true,
};
//added

app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api', userroutes, event, travel, clubroutes, faq, affiliate, resort);
app.use('/admin', adminRoutes);
db();
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);
server.listen(PORT, () => {
	console.log(`Connected to port ${PORT}`);
});

const io = require('socket.io')(server, {
	cors: {
		origin: [
			'http://localhost:3000',
			'http://localhost:3001',
			'https://swinxter-v2.vercel.app',
			'https://swinxter-admin.vercel.app',
			'https://www.swinxter.com',
			'https://swinxter-front.vercel.app',
			'https://swinxter-admin-teal.vercel.app',
			'https://app.swinxter.com',
			'https://dev.swinxter.com',
		],
	},
});

let onlineUser = [];

const addUser = (username, userid, socketid) => {
	!onlineUser.some(user => user.userid === userid) &&
		onlineUser.push({ username, userid, socketid });
};

const removeUser = socketid => {
	onlineUser = onlineUser.filter(user => user.socketid !== socketid);
};

const getUser = userid => {
	return onlineUser.find(user => user.userid === userid);
};

io.on('connection', socket => {
	socket.on('newUser', user => {
		addUser(user.username, user.userid, socket.id);
		console.log(onlineUser);
	});

	socket.on(
		'sendNotification',
		({ senderId, senderName, recieverId, recieverName, type, message }) => {
			const reciever = getUser(recieverId);
			if (reciever) {
				io.to(reciever.socketid).emit('getNotification', {
					senderId,
					senderName,
					recieverId,
					recieverName,
					type,
					message,
				});
			}
		}
	);

	socket.on('disconnect', () => {
		removeUser(socket.id);
		console.log(`User disconnected. Current online users:`, onlineUser);
	});
});
