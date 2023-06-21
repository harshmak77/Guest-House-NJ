const express = require('express')
const router = express.Router()
const config = require('../config/config')
const getUrlPrefix = config.app.prefix
const { addNewBooking, editBooking, editAdmin, viewAdmin, deleteAdmin, viewRoom, editRoom, deleteRoom, addNewRoom, setNewPassword, forgotPassword, loginUser, logout, signup, addBuildingDetails, deleteBuildingDetails, getAllBuildingDetails, deleteBooking, editBuildingDetails, getAllBookingDetails, viewBuilding, viewBooking, addGuest, viewGuestDetails, editGuest, getAllGuestDetails, getAllRoomDetails, getAllAdminDetails, deleteGuest } = require('../controller/routeMethods/login')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'adminfileupload/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'guestfileupload/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //Appending .jpg
  }
});
const fileupload = multer({ storage: storage1 });

router.get(getUrlPrefix + '/ping', (req, res) => {
  res.status(200).send('pong')
})
router.post(getUrlPrefix + '/signup', upload.single("adminFileUpload"), (req, res) => {
  signup(req, res)
})
router.get(getUrlPrefix + '/login', (req, res) => {
  loginUser(req, res)
})
router.post(getUrlPrefix + '/logout', (req, res) => {
  logout(req, res)
})
router.post(getUrlPrefix + '/deleteBuildingDetails', (req, res) => {
  deleteBuildingDetails(req, res)
})
router.post(getUrlPrefix + '/addBuildingDetails', (req, res) => {
  addBuildingDetails(req, res)
})
router.get(getUrlPrefix + '/getAllBuildingDetails', (req, res) => {
  getAllBuildingDetails(req, res)
})
router.get(getUrlPrefix + '/getAllBookingDetails', (req, res) => {
  getAllBookingDetails(req, res)
})
router.post(getUrlPrefix + '/deleteBooking', (req, res) => {
  deleteBooking(req, res)
})
router.post(getUrlPrefix + '/editBuilding', (req, res) => {
  editBuildingDetails(req, res)
})
router.post(getUrlPrefix + '/viewBuilding', (req, res) => {
  viewBuilding(req, res)
})
router.post(getUrlPrefix + '/addGuest', fileupload.single("guestFileUpload"), (req, res) => {
  addGuest(req, res)
})
router.post(getUrlPrefix + '/viewGuest', (req, res) => {
  viewGuestDetails(req, res)
})
router.post(getUrlPrefix + '/editGuest', (req, res) => {
  editGuest(req, res)
})
router.get(getUrlPrefix + '/getAllGuestDetails', (req, res) => {
  getAllGuestDetails(req, res)
})
router.get(getUrlPrefix + '/getAllAdminDetails', (req, res) => {
  getAllAdminDetails(req, res)
})
router.get(getUrlPrefix + '/getAllRoomDetails', (req, res) => {
  getAllRoomDetails(req, res)
})
router.post(getUrlPrefix + '/setNewPassword', (req, res) => {
  setNewPassword(req, res)
})
router.post(getUrlPrefix + '/forgotPassword', (req, res) => {
  forgotPassword(req, res)
})
router.post(getUrlPrefix + '/addNewRoom', (req, res) => {
  addNewRoom(req, res)
})
router.post(getUrlPrefix + '/deleteRoom', (req, res) => {
  deleteRoom(req, res)
})
router.post(getUrlPrefix + '/editRoom', (req, res) => {
  editRoom(req, res)
})
router.post(getUrlPrefix + '/viewRoom', (req, res) => {
  viewRoom(req, res)
})
router.post(getUrlPrefix + '/deleteAdmin', (req, res) => {
  deleteAdmin(req, res)
})
router.post(getUrlPrefix + '/viewAdmin', (req, res) => {
  viewAdmin(req, res)
})
router.post(getUrlPrefix + '/editAdmin', (req, res) => {
  editAdmin(req, res)
})
router.post(getUrlPrefix + '/viewBooking', (req, res) => {
  viewBooking(req, res)
})
router.post(getUrlPrefix + '/editBookingDetails', (req, res) => {
  editBooking(req, res)
})
router.post(getUrlPrefix + '/addNewBooking', (req, res) => {
  addNewBooking(req, res)
})
router.post(getUrlPrefix + '/deleteGuest', (req, res) => {
  deleteGuest(req, res)
})


module.exports = router
