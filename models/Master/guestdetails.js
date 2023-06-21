const mongoose = require('mongoose');
//const { stringify } = require('uuid');
let Schema = mongoose.Schema;
mongoose.pluralize(null);

let guestDetailsSchema = new Schema({
    guestFullName: {
        type: String,
        required: true
    },
    guestEmailId: {
        type: String,
        required: true
    },
    guestGender: {
        type: String,
        required: true
    },
    guestBirthDate: {
        type: String,
        required: true
    },
    guestMobileNumber: {
        type: String,
        required: true
    },
    guestAddress: {
        type: String,
        required: true
    },
    guestIdProofType: {
        type: String,
        required: true
    },
    guestIdProofNumber: {
        type: Number,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    guestFileUpload: {
        type: Object,
        required: true,

    },
    isDelete: {
        type: Boolean,
        required: true,
        default: false
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
})




module.exports.guestdetails = mongoose.model('guestdetails', guestDetailsSchema)