const mongoose = require('mongoose');

let Schema = mongoose.Schema;
mongoose.pluralize(null);

let buildingDetailsSchema = new Schema({
    buildingNumber: {
        type: Number,
        required: true,
        default: false
    },
    adminName: {
        type: String,
        required: true,
        ref: 'adminDetails',
        default: false
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'adminDetails'
    },
    ownerName: {
        type: String,
        required: true,
        ref: 'adminDetails',
        default: false

    },
    ownerId: {
        type: Number,
        required: false,
        ref: 'adminDetails'
    },
    isDelete: {
        type: Boolean,
        required: true,
        default: false
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    }

}, {
    timestamps: true
})




module.exports.buildingDetails = mongoose.model('buildingDetails', buildingDetailsSchema)