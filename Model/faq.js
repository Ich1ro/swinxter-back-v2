const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: { type: String },
  answer: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const faq = mongoose.model("faq", faqSchema);

module.exports = faq;
