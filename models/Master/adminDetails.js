const mongoose = require('mongoose');
//const { stringify } = require('uuid');
let Schema = mongoose.Schema;
mongoose.pluralize(null);
let adminDetailsSchema = new Schema({
    adminFullName: {
        type: String,
        required: true
    },
    adminEmailId: {
        type: String,
        required: true
    },
    adminPassword: {
        type: String,
        required: false
    },
    adminGender: {
        type: String,
        required: true
    },
    adminBirthDate: {
        type: String,
        required: true
    },
    adminMobileNumber: {
        type: String,
        required: true
    },
    adminAddress: {
        type: String,
        required: true
    },
    AdminIdProofType: {
        type: String,
        required: true
    },

    adminIdProofNumber: {
        type: Number,
        required: true
    },
    buildingNumber: {
        type: String,
        required: true,
        ref: 'buildingDetails'
    },
    role: {
        type: String,
        required: true,
        ref: 'roleDetails'
    },
    isDelete: {
        type: Boolean,
        required: true,
        default: false
    },
    adminFileUpload: {
        type: Object,
        required: true,
    }
}, {
    timestamps: true
})
module.exports.admindetails = mongoose.model('admindetails', adminDetailsSchema)