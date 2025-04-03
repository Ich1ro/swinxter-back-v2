const mongoose = require("mongoose");

const NotificationModel = new mongoose.Schema({
    senderId: { type: String },
    recieverId: { type: String },
    senderName: { type: String },
    recieverName: { type: String },
    type: { type: String },
    message: { type: String },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("notifications", NotificationModel);

module.exports = Notification;