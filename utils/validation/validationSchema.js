const joi = require('joi');
const REGEX_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const REGEX_NAME = /^[a-zA-Z][a-zA-Z ]+$/;
const REGEX_MOBILE_NUMBER = /^[0-9]+$/;
const REGEX_EMAILID = /^[a-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[a-z0-9.-]+$/;
const REGEX_DATE = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;
const REGEX_TIME = /^(1[0-2]|0?[1-9]):([0-5]?[0-9])(●?[AP]M)?$/;
const login = {
    adminEmailId: joi.string().email().required().error(() => new Error("Invalid Email ID")),
    adminPassword: joi.string().regex(REGEX_PASSWORD).required()
}
const signUp = {
    adminFullName: joi.string().required().error(() => new Error("Invalid fullname")),
    adminEmailId: joi.string().email().required().error(() => new Error("Invalid Email ID format")),
    adminMobileNumber: joi.string().length(10).regex(REGEX_MOBILE_NUMBER).required().error(() => new Error("Invalid Mobile Number")),
    adminGender: joi.string().required().error(() => new Error("Invalid gender")),
    adminBirthDate: joi.string().regex(REGEX_DATE).required().error(() => new Error("Invalid date ID format")),
    adminAddress: joi.string().required(),
    AdminIdProofType: joi.string().required(),
    adminIdProofNumber: joi.string().required().error(() => new Error("Invalid proof Number")),
    buildingNumber: joi.number().required(),
    role: joi.string().required()
}
const setNewPassword = {
    adminEmailId: joi.string().email().required().error(() => new Error("Invalid Email ID format")),
    adminPassword: joi.string().min(8).regex(REGEX_PASSWORD).required()
}
const addBuilding = {
    buildingNumber: joi.string().required(),
    adminName: joi.string().regex(REGEX_NAME).required(),
    ownerName: joi.string().regex(REGEX_NAME).required()

}
const deleteBuilding = {
    buildingNumber: joi.string().required().error(() => new Error("Invalid number format")),
}
const viewBuilding = {
    buildingNumber: joi.string().required(),
    adminName: joi.string().regex(REGEX_NAME).required(),
    ownerName: joi.string().regex(REGEX_NAME).required()
}
const editBuildingDetails = {
    buildingNumber: joi.string().regex(REGEX_MOBILE_NUMBER).required(),
    adminName: joi.string().regex(REGEX_NAME).required(),
    ownerName: joi.string().regex(REGEX_NAME).required()
}

const viewBooking = {
    roomNumber: joi.string().required().error(() => new Error("Invalid number format")),
    buildingNumber: joi.string().required().error(() => new Error("Invalid building number format")),
    guestMobileNumber: joi.string().regex(REGEX_MOBILE_NUMBER).required().error(() => new Error("Invalid number format")),
    checkInDate: joi.string().required().error(() => new Error("Invalid date format")),
    checkOutDate: joi.string().required().error(() => new Error("Invalid date format")),}
const addGuest = {
    guestEmailId: joi.string().regex(REGEX_EMAILID).required().error(() => new Error("Invalid Email ID format")),
    guestGender: joi.string().required(),
    guestMobileNumber: joi.string().regex(REGEX_MOBILE_NUMBER).required().error(() => new Error("Invalid number format")),
    guestBirthDate: joi.string().regex(REGEX_DATE).required(),
    guestAddress: joi.string().required(),
    guestIdProofType: joi.string().required(),
    guestIdProofNumber: joi.string().required(),
    vehicleNumber: joi.string().required(),
    guestFullName: joi.string().required(),

}
const viewGuest = {
    guestFullName: joi.string().required(),
    guestEmailId: joi.string().regex(REGEX_EMAILID).required().error(() => new Error("Invalid Email ID format")),
    guestGender: joi.string().required(),
    guestMobileNumber: joi.string().regex(REGEX_MOBILE_NUMBER).required().error(() => new Error("Invalid number format")),
    guestBirthDate: joi.string().regex(REGEX_DATE).required(),
    guestAddress: joi.string().required(),
    guestIdProofType: joi.string().required(),
    guestIdProofNumber: joi.string().required(),
    vehicleNumber: joi.string().required()
}
const editGuests = {
    guestFullName: joi.string().required(),
    guestEmailId: joi.string().regex(REGEX_EMAILID).required().error(() => new Error("Invalid Email ID format")),
    guestGender: joi.string().required(),
    guestMobileNumber: joi.string().regex(REGEX_MOBILE_NUMBER).required().error(() => new Error("Invalid number format")),
    guestBirthDate: joi.string().regex(REGEX_DATE).required().error(() => new Error("Invalid birth date format")),
    guestAddress: joi.string().required(),
    guestIdProofType: joi.string().required(),
    guestIdProofNumber: joi.string().required(),
    vehicleNumber: joi.string().required()
}
const forgotPassword = {
    adminEmailId: joi.string().regex(REGEX_EMAILID).required().error(() => new Error("Invalid Email ID format")),

}
const addNewRoom = {
    roomNumber: joi.string().length(3).required().error(() => new Error("Invalid Room Number")),
    roomType: joi.required(),
    buildingNumber: joi.required(),
}
const editRoom = {
    roomNumber: joi.string().length(3).required().error(() => new Error("Invalid Room Number")),
    roomType: joi.required(),
    buildingNumber: joi.required(),
}
const deleteRoom = {
    roomNumber: joi.string().length(3).required().error(() => new Error("Invalid Room Number")),
    buildingNumber: joi.required()
}
const viewRoom = {
    roomNumber: joi.string().length(3).required().error(() => new Error("Invalid Room Number")),
    buildingNumber: joi.required(),
}
const deleteAdmin = {
    adminEmailId: joi.string().email().required().error(() => new Error("Invalid Email ID format")),
}
const viewAdmin = {
    adminEmailId: joi.string().email().required().error(() => new Error("Invalid Email ID format"))
}
const editAdmin = {
    adminFullName: joi.string().required(),
    adminEmailId: joi.string().email().required().error(() => new Error("Invalid Email ID format")),
    adminMobileNumber: joi.string().length(10).required().error(() => new Error("Invalid Mobile Number")),
    adminGender: joi.string().required(),
    adminBirthDate: joi.string().required(),
    adminAddress: joi.string().required(),
    buildingNumber: joi.string().required(),
    role: joi.string().required()
}
const addNewBooking = {
    roomNumber: joi.string().required().error(() => new Error("Invalid number format")),
    buildingNumber: joi.string().required().error(() => new Error("Invalid building number format")),
    guestFullName: joi.string().required().regex(REGEX_NAME).error(() => new Error("Invalid full name format")),
    guestMobileNumber: joi.string().regex(REGEX_MOBILE_NUMBER).required().error(() => new Error("Invalid number format")),
    comingFrom: joi.string().required(),
    goingTo: joi.string().required(),
    checkInDate: joi.string().required(),
    checkOutDate: joi.string().required(),
}
const editBooking = {
    roomNumber: joi.string().required().error(() => new Error("Invalid number format")),
    buildingNumber: joi.string().required().error(() => new Error("Invalid building number format")),
    guestFullName: joi.string().required().regex(REGEX_NAME).error(() => new Error("Invalid full name format")),
    guestMobileNumber: joi.string().regex(REGEX_MOBILE_NUMBER).required().error(() => new Error("Invalid number format")),
    comingFrom: joi.string().required(),
    goingTo: joi.string().required(),
    checkInDate: joi.string().required(),
    checkOutDate: joi.string().required(),
}
const deleteBooking = {
    roomNumber: joi.string().required().error(() => new Error("Invalid number format")),
    buildingNumber: joi.string().required().error(() => new Error("Invalid building number format")),
    guestEmailId: joi.string().required()
}
const deleteGuest = {
    guestEmailId: joi.string().required(),
    guestFullName: joi.string().required()
}
module.exports.validationController = {

    loginSchema: joi.object(login).required(),
    signUpSchema: joi.object(signUp).required(),
    setNewPasswordSchema: joi.object(setNewPassword).required(),
    addBuildingSchema: joi.object(addBuilding).required(),
    deleteBuildingSchema: joi.object(deleteBuilding).required(),
    viewBuildingSchema: joi.object(viewBuilding).required(),
    editBuildingSchema: joi.object(editBuildingDetails).required(),
    viewBookingSchema: joi.object(viewBooking).required(),
    addGuestSchema: joi.object(addGuest).required(),
    viewGuestSchema: joi.object(viewGuest).required(),
    editGuestSchema: joi.object(editGuests).required(),
    forgotPasswordSchema: joi.object(forgotPassword).required(),
    addNewRoomSchema: joi.object(addNewRoom).required(),
    deleteRoomSchema: joi.object(deleteRoom).required(),
    editRoomSchema: joi.object(editRoom).required(),
    viewRoomSchema: joi.object(viewRoom).required(),
    deleteAdminSchema: joi.object(deleteAdmin).required(),
    viewAdminSchema: joi.object(viewAdmin).required(),
    editAdminSchema: joi.object(editAdmin).required(),
    addNewBookingSchema: joi.object(addNewBooking).required(),
    editBookingSchema: joi.object(editBooking).required(),
    deleteBookingSchema: joi.object(deleteBooking).required(),
    deleteGuestSchema: joi.object(deleteGuest).required()
}