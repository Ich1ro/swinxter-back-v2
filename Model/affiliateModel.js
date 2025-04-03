const mongoose = require('mongoose');

const affiliateSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    discountByPrice: {
        type: Number,
    },
    discountByPerc: {
        type: Number,
    },
    expiry:{
        type: Date,
        required: true,
    },
    usedByUser:{
        type: [String],
        default: [],
    }
})

const affiliateModel = mongoose.model('affiliateLink', affiliateSchema);

module.exports = affiliateModel;