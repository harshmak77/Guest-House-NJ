
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
mongoose.pluralize(null);

let roomTypeDetailsSchema = new Schema({
    roomName: {
        type: String,
        required: true
    },
    bedCount: {
        type: Number,
        required: true
    },
    attachedBathroom: {
        type: Boolean,
        required: true
    },
    airConditioner: {
        type: Boolean,
        required: true
    },
    geysor: {
        type: Boolean,
        required: true
    },
    balcony: {
        type: Boolean,
        required: true
    },

}, {
    timestamps: true
})




module.exports.roomTypeDetailsSchema = mongoose.model('roomDetails', roomTypeDetailsSchema)