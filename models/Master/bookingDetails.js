const mongoose = require('mongoose');
//const { stringify } = require('uuid');
let Schema = mongoose.Schema;
mongoose.pluralize(null);

let bookingDetailsSchema = new Schema({

    roomType: {
        type: String,
        required: false,
        ref: 'roomDetails'
    },
    roomNumber: {
        type: Number,
        required: true,
        ref: 'roomDetails'
    },
    buildingNumber: {
        type: Number,
        required: true,
        ref: 'buildingDetails'
    },
    guestFullName: {
        type: [String],
        required: true,
        ref: 'guestDetails'
    },
    guestMobileNumber: {
        type: [String],
        required: true,
        ref: 'guestDetails'
    },
    guestEmailId: {
        type: [String],
        required: true,
        ref: 'guestDetails'
    },
    comingFrom: {
        type: String,
        required: true
    },
    goingTo: {
        type: String,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true,
        default: null
    },
    checkOutDate: {
        type: Date,
        required: true,
        default: null
    },
    isDelete: {
        type: Boolean,
        required: true,
        default: false
    }

}, {
    timestamps: true
})

module.exports.bookingdetails = mongoose.model('bookingdetails', bookingDetailsSchema)