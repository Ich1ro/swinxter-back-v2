const mongoose = require("mongoose");

const GeoSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
  },
  coordinates: [Number]
});

const travelSchema = new mongoose.Schema({
  image: { type: String },
  // age: { type: String },
  // age2:{ type: String },
  name: { type: String },
  locationto: Object,
  startDate: { type: String },
  resort: {type: String},
  location: {
    region: { type: String },
    municipality: { type: String },
    country: { type: String },
    address: {type: String},
    street: {type: String}
  },
  geometry: GeoSchema,
  
  endDate: { type: String },
  interested: [{ type: String }],
  description: { type: String },
  // userInfo :{type:String},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isVerify: { type: Boolean, default: false },
});
travelSchema.index({ geometry: '2dsphere' });

const travel = mongoose.model("travel", travelSchema);

module.exports = travel;
