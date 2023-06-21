
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
mongoose.pluralize(null);

let roomDetailsSchema = new Schema({
    roomNumber: {
        type: Number,
        required: true
    },
    buildingNumber: {
        type: Number,
        required: true,
        ref: 'buildingDetails'
    },
    roomType: {
        type: String,
        required: true,
        ref: 'roomTypeDetails'
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    roomActive: {
        type: Boolean,
        required: true,
        default: false
    },
    checkInDate: {
        type: Date,
        required: false,
        default: null,
        ref: 'bookingDetails'
    },
    checkOutDate: {
        type: Date,
        required: false,
        default: null,
        ref: 'bookingDetails'
    },
    isDelete: {
        type: Boolean,
        required: true,
        default: false
    }

}, {
    timestamps: true
})

module.exports.roomDetails = mongoose.model('roomDetails', roomDetailsSchema)