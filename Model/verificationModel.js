const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  verification_result: { type: Array },
});

const verification = mongoose.model("Verification", verificationSchema);

module.exports = verification;
