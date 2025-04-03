const mongoose = require("mongoose");

const replySchema = mongoose.Schema({
    repliedUserId:String,
    username: String,
    userPhoto: String,
    comment: String,
  })
  
const reply = mongoose.model("reply",replySchema);

module.exports = reply;
