const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
    name: {type: String},
    username: {type: String, required: true},
    password: {type: String},
    createdAt: {type: Date, default: Date.now},
    events: {type: Boolean, default: false},
    clubs: {type: Boolean, default: false},
    situationships: {type: Boolean, default: false},
    users: {type: Boolean, default: false},
    admins: {type: Boolean, default: false},
});

const adminUser = mongoose.model("adminUser", adminUserSchema);

module.exports = adminUser;