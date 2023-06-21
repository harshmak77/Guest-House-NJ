const adminDetailsSchema = require("../../models/Master/adminDetails")
const buildingDetailsSchema = require("../../models/Master/buildingDetails")
const bookingDetailsSchema = require("../../models/Master/bookingDetails")
const roomDetailsSchema = require("../../models/Master/roomDetails")
const guestDetailsSchema = require("../../models/Master/guestdetails")
const { findOne, create, update, find, findQuery, updateMany } = require("../../services/mongoOps/index");
const bcrypt = require('bcryptjs');
const { httpResponseHandlerError } = require("../../services/httpResponseHandler");
const { validationChecker } = require("../../services/common")
const { validationController } = require("../../utils/validation/validationSchema")
const { jwtToken } = require('../../services/jwt')


async function loginUser(req, res, next) {
    try {
        const { adminEmailId, adminPassword } = req.body;
        const query = {
            "adminEmailId": adminEmailId
        }
        const validateCheck = await validationChecker(validationController.loginSchema, req.body)
        if (!validateCheck.flag) {
            return httpResponseHandlerError(
                res,
                400,
                validateCheck.error
            )
        }
        const userDetails = await findOne(adminDetailsSchema.admindetails, query);
        if (!userDetails) {
            return httpResponseHandlerError(
                res,
                400,
                "EmailId/Password is Invalid "
            )
        }
        const passwordToBeMatch = userDetails.adminPassword
        const isMatched = await bcrypt.compare(adminPassword, passwordToBeMatch)
        if (!isMatched) {
            return httpResponseHandlerError(
                res,
                400,
                "EmailId/Password is Invalid"
            )
        }

        let tokenData = {
            adminEmailId: userDetails.adminEmailId,
            adminFullName: userDetails.adminFullName,
            adminMobileNumber: userDetails.adminMobileNumber,
            role: userDetails.role
        }

        let token = await jwtToken.generateToken(tokenData)
        if (token) {
            const userResponse = {
                // status: msgCodeJson.ERR004.msg,
                message: "Login Sucessfully",
                data: {
                    adminEmailId: userDetails.adminEmailId,
                    adminFullName: userDetails.adminFullName,
                    adminMobileNumber: userDetails.adminMobileNumber,
                    role: userDetails.role
                }
            }
        }

        res.cookie('GHSSO', token, {
            secure: process.env.NODE_ENV == "development" || process.env.NODE_ENV == "dev" ? false : true,
            httpOnly: true,
            domain: req.hostname
        });
        // console.log(token, 'hi')
        res.status(200).send({ status: "Login Successfull" })

    }


    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "Invalid.."
        )
    }
}
async function signup(req, res, next) {
    try {
        const data = req.body
        const query = {
            "adminFullName": data.adminFullName,
            "adminEmailId": data.adminEmailId,
            "adminMobileNumber": data.adminMobileNumber,
            "adminGender": data.adminGender,
            "adminBirthDate": data.adminBirthDate,
            "adminIdProofNumber": data.adminIdProofNumber,
            "adminBirthDate": data.adminBirthDate,
            "adminAddress": data.adminAddress,
            "buildingNumber": data.buildingNumber,
            "role": data.role,
            "AdminIdProofType": data.AdminIdProofType,
            "adminFileUpload": data.adminFileUpload
        }
        const validateCheck = await validationChecker(validationController.signUpSchema, req.body)
        if (!validateCheck) {
            return httpResponseHandlerError(
                res,
                400,
                "invalid validation"
            )
        }
        const isEmailExist = await findOne(adminDetailsSchema.admindetails, { "adminEmailId": query.adminEmailId })
        if (isEmailExist) {
            //console.log(isEmailExist);
            return httpResponseHandlerError(
                res,
                400,
                "emailid exist"
            )
        }

        query["adminFileUpload"] = req.file;

        const response = await create(adminDetailsSchema.admindetails, query);
        if (!response) {
            return httpResponseHandlerError(
                res,
                400,
                "Invalid"
            )
        }

        res.status(200).json({ message: "SignUp Successfull", "Added Details": response + req.file })
        console.log("SignUp Successfull");

    }
    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "Invalid.."
        )
    }
}
async function getAllBuildingDetails(req, res, next) {
    try {
        const { } = req.body;
        const query1 = {
            "isDelete": false

        }
        const buildingDetailsExist = await find(buildingDetailsSchema.buildingDetails, query1)
        if (!buildingDetailsExist) {
            return httpResponseHandlerError(
                res,
                400,
                "building does not exist"
            )
        }

        res.json({ message: "all building get successfully", data: buildingDetailsExist })
        console.log("all building get successfully");
    }
    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function addBuildingDetails(req, res, next) {
    try {
        const { buildingNumber, adminName, ownerName } = req.body;
        const query1 = {
            "buildingNumber": buildingNumber,
            "adminName": adminName,
            "ownerName": ownerName

        }
        const validateCheck = await validationChecker(validationController.addBuildingSchema, req.body)
        if (!validateCheck.flag) {
            return httpResponseHandlerError(
                res,
                400,
                validateCheck.error
            )
        }
        const buildingDetailsExist = await findOne(buildingDetailsSchema.buildingDetails, { "buildingNumber": buildingNumber })
        if (buildingDetailsExist) {
            return httpResponseHandlerError(
                res,
                400,
                "building exist"
            )
        }
        const addBuilding = await create(buildingDetailsSchema.buildingDetails, query1)
        if (!addBuilding) {
            return httpResponseHandlerError(
                res,
                400,
                "error in adding building"
            )
        }

        res.json({ message: "building details added successfully", data: addBuilding })
        console.log("building details added successfully");
    }
    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function getAllBookingDetails(req, res, next) {
    try {
        const query1 = {
            "isDelete": false

        }
        const bookingDetailsExist = await find(bookingDetailsSchema.bookingdetails, query1)
        if (!bookingDetailsExist) {
            return httpResponseHandlerError(
                res,
                400,
                "booking does not exist"
            )
        }

        res.json({ message: "all booking details get successfully" })
        console.log("all booking details get successfully");
    }
    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function deleteBuildingDetails(req, res, next) {
    try {
        const { buildingNumber } = req.body;
        const query1 = {
            "buildingNumber": buildingNumber

        }
        const validateCheck = await validationChecker(validationController.deleteBuildingSchema, req.body)
        if (!validateCheck.flag) {
            return httpResponseHandlerError(
                res,
                400,
                validateCheck.error
            )
        }
        const Buildingexist = await findOne(buildingDetailsSchema.buildingDetails, query1)
        if (!Buildingexist) {
            return httpResponseHandlerError(
                res,
                400,
                "building does not exist"
            )
        }
        else {
            const buildingNumberExist = await update(buildingDetailsSchema.buildingDetails, { "buildingNumber": buildingNumber }, { $set: { "isDelete": true, "isActive": false } })
            if (!buildingNumberExist) {
                return httpResponseHandlerError(
                    res,
                    400,
                    "building number does not exist"
                )
            }
        }

        res.json({ message: " building details delete successfully" })
        console.log("building details delete successfully");
    }
    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function editBuildingDetails(req, res, next) {
    try {
        const { buildingNumber, adminName, ownerName } = req.body;
        const validateCheck = await validationChecker(validationController.editBuildingSchema, req.body)
        if (!validateCheck.flag) {
            return httpResponseHandlerError(
                res,
                400,
                validateCheck.error
            )
        }
        const Buildingexist = await findOne(buildingDetailsSchema.buildingDetails, { "buildingNumber": buildingNumber })

        if (!Buildingexist) {
            return httpResponseHandlerError(
                res,
                400,
                "building does not exist")
        } else {

            const editBuildingDetails = await update(buildingDetailsSchema.buildingDetails, { "buildingNumber": buildingNumber }, { $set: { "adminName": adminName, "ownerName": ownerName } })
            if (!editBuildingDetails) {
                return httpResponseHandlerError(
                    res,
                    400,
                    "error while editing data"
                )
            }
            res.json({ message: "building details edited successfully", "Existing Details": Buildingexist, "Updated Details": editBuildingDetails })
            console.log("building details edited successfully");
        }
    }
    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}

async function viewBuilding(req, res, next) {
    try {
        const { buildingNumber, adminName, ownerName } = req.body;
        const query1 = {
            "buildingNumber": buildingNumber,

        }
        const validateCheck = await validationChecker(validationController.viewBuildingSchema, req.body)
        if (!validateCheck) {
            return httpResponseHandlerError(
                res,
                400,
                "invalid validation"
            )
        }
        const Buildingexist = await findOne(buildingDetailsSchema.buildingDetails, query1)
        if (!Buildingexist) {
            return httpResponseHandlerError(
                res,
                400,
                "building does not exist")
        }

        res.json({ message: "building details edited successfully", data: Buildingexist })

    }

    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}



async function addGuest(req, res, next) {
    try {
        // const { guestFullName, guestEmailId, guestGender, guestMobileNumber, guestBirthDate, guestAddress, guestIdProofType, guestIdProofNumber, vehicleNumber } = req.body;
        const data = req.body
        const query = {
            "guestFullName": data.guestFullName,
            "guestEmailId": data.guestEmailId,
            "guestGender": data.guestGender,
            "guestBirthDate": data.guestBirthDate,
            "guestMobileNumber": data.guestMobileNumber,
            "guestAddress": data.guestAddress,
            "guestIdProofType": data.guestIdProofType,
            "guestIdProofNumber": data.guestIdProofNumber,
            "vehicleNumber": data.vehicleNumber,
            "guestFileUpload": data.guestFileUpload

        }
        const validateCheck = await validationChecker(validationController.addGuestSchema, req.body)
        if (!validateCheck.flag) {
            return httpResponseHandlerError(
                res,
                400,
                validateCheck.error
            )
        }
        const guestDetailsExist = await findOne(guestDetailsSchema.guestdetails, { "guestEmailId": query.guestEmailId })
        if (guestDetailsExist) {
            return httpResponseHandlerError(
                res,
                400,
                "guest exist"
            )
        } else {
            query["guestFileUpload"] = req.file;
            const addGuestDetails = await create(guestDetailsSchema.guestdetails, query, { $set: { "isDelete": true, "isActive": false } });
            if (!addGuestDetails) {
                return httpResponseHandlerError(
                    res,
                    400,
                    "error in adding guest"
                )
            }


            res.json({ message: "guest details added successfully", "Added Details": addGuestDetails + req.file })
            console.log("guest details added successfully");
        }
    }
    catch (error) {
        console.log(error)
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function getAllGuestDetails(req, res, next) {
    try {
        const query1 = {
            isDelete: "false"

        }
        const guestexist = await find(guestDetailsSchema.guestdetails, query1)
        if (!guestexist) {
            return httpResponseHandlerError(
                res,
                400,
                "guest details does not exist")
        }
        console.log(" guest details  fetched successfully", guestexist);
        res.json({ message: " guest details fetched successfully", data: guestexist })

    }

    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function viewGuestDetails(req, res, next) {
    try {
        const { guestEmailId} = req.body;
        const query1 = {
            "guestEmailId": guestEmailId,

        }
        const validateCheck = await validationChecker(validationController.viewGuestSchema, req.body)
        if (!validateCheck.flag) {
            return httpResponseHandlerError(
                res,
                400,
                validateCheck.error
            )
        }
        const guestexist = await findOne(guestDetailsSchema.guestdetails, query1)
        if (!guestexist) {
            return httpResponseHandlerError(
                res,
                400,
                "guest details does not  exist")
        }

        res.json({ message: "guest details view successfully", data: guestexist })

    }
    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function editGuest(req, res, next) {
    try {
        const { guestFullName, guestEmailId, guestGender, guestMobileNumber, guestBirthDate, guestAddress, guestIdProofType, guestIdProofNumber, vehicleNumber } = req.body;
        const validateCheck = await validationChecker(validationController.editGuestSchema, req.body)
        if (!validateCheck.flag) {
            return httpResponseHandlerError(
                res,
                400,
                validateCheck.error
            )
        }
        const guestDetailexist = await findOne(guestDetailsSchema.guestdetails, { "guestEmailId": guestEmailId })
        let editguestDetails = "";
        if (!guestDetailexist) {
            return httpResponseHandlerError(
                res,
                400,
                "guest details does not exist")
        } else {

            editguestDetails = await update(guestDetailsSchema.guestdetails, { "guestEmailId": guestEmailId }, { $set: { "guestFullName": guestFullName, "guestGender": guestGender, "guestBirthDate": guestBirthDate, "guestMobileNumber": guestMobileNumber, "guestAddress": guestAddress, "guestIdProofType": guestIdProofType, "guestIdProofNumber": guestIdProofNumber, "vehicleNumber": vehicleNumber } })
            if (!editguestDetails) {
                return httpResponseHandlerError(
                    res,
                    400,
                    "error while editing data"
                )
            }
        }
        res.json({ message: "Guest details edited Successfully ", "Existing Details": guestDetailexist, "Updated Details": editguestDetails })
        console.log("Guest details edited successfully");

    }
    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function deleteGuest(req, res, next) {
    try {
        const { guestFullName, guestEmailId } = req.body;
        const validateCheck = await validationChecker(validationController.deleteGuestSchema, req.body)
        if (!validateCheck.flag) {
            return httpResponseHandlerError(
                res,
                400,
                validateCheck.error
            )
        }

        const guestExists = await findOne(guestDetailsSchema.guestdetails, { "guestEmailId": guestEmailId })
        if (!guestExists) {
            return httpResponseHandlerError(
                res,
                400,
                "guest does not exist"
            )
        }
        else {
            const deleteGuest = await update(guestDetailsSchema.guestdetails, { "guestEmailId": guestEmailId }, { $set: { "isDelete": true, "isActive": false } })
            if (!deleteGuest) {
                return httpResponseHandlerError(
                    res,
                    400,
                    "error while deleting guest"
                )
            }
        }

        res.status(200).send("deleted guest Successfully")
        console.log(" delete guest successfully");
    }
    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}

async function getAllRoomDetails(req, res, next) {
    try {

        const query1 = {
            isDelete: "false"

        }
        const roomexist = await find(roomDetailsSchema.roomDetails, query1)
        if (!roomexist) {
            return httpResponseHandlerError(
                res,
                400,
                "room details does not  exist"
            )
        }
        console.log("room details  fetch successfully");
        res.json({ message: "room details fetch successfully", data: roomexist })
    }
    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}

async function getAllAdminDetails(req, res, next) {
    try {
        const query1 = {
            isDelete: "false"

        }
        const adminexist = await find(adminDetailsSchema.admindetails, query1)
        if (!adminexist) {
            return httpResponseHandlerError(
                res,
                400,
                "admin does not exist"
            )
        }
        console.log("all admin details get successfully");
        res.json({ message: "all admin details get successfully", data: adminexist })

    }
    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function setNewPassword(req, res, next) {
    try {
        const { adminEmailId, adminPassword } = req.body;
        const query1 = {
            "adminEmailId": adminEmailId
        }
        const validateCheck = await validationChecker(validationController.setNewPasswordSchema, req.body)
        if (!validateCheck) {
            return httpResponseHandlerError(
                res,
                400,
                "invalid validation"
            )
        }
        const isUserExists = await findOne(adminDetailsSchema.admindetails, query1)
        if (!isUserExists) {
            return httpResponseHandlerError(
                res,
                400,
                "user doesn't exist"
            )
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedAdminPassword = await bcrypt.hash(adminPassword, salt);
        const passwordUpdate = await update(adminDetailsSchema.admindetails, { "adminEmailId": adminEmailId }, { $set: { "adminPassword": hashedAdminPassword } })
        if (!passwordUpdate) {
            console.log(passwordUpdate)
            return httpResponseHandlerError(
                res,
                400,
                "Error while setNewPassword process"
            )
        }
        res.status(200).send("Success")
        console.log("set password successfully");
    }
    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function forgotPassword(req, res, next) {
    try {
        const { adminEmailId } = req.body;
        const query1 = {
            "adminEmailId": adminEmailId
        }
        const isUserExists = await findOne(adminDetailsSchema.admindetails, query1)
        if (!isUserExists) {
            return httpResponseHandlerError(
                res,
                400,
                "error in forgot Password")
        } else {
            console.log("success");
        }
    }
    catch (error) {
        console.log
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function logout(req, res, next) {
    try {
        let { cookie } = req.headers
        console.log(cookie);
        let token = getcookie(cookie)
        // res.clearCookie('GHSSO', { path: '/', domain: req.hostname });
        if (cookie) {
            res.clearCookie('GHSSO', { path: '/', domain: req.hostname });
            console.log("logout successfully");
            res.json({ message: "logout successfully" })
        }
    }
    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}


function getcookie(cookieData) {
    try {
        let cookies = {}
        if (!cookieData) {
            cookieData.split(';').forEach(function (cookie) {
                let parts = cookie.match(/(.*?)=(.*)$/)
                if (parts) {
                    cookies[parts[1].trim()] = (parts[2] || '').trim()
                }
            })
        }
        let cookie = cookies['GHSSO'] ? cookies['GHSSO'] : cookies['GHSSO']
        return cookie
    } catch (error) {
        console.log(error)
        return false
    }
}

async function addNewRoom(req, res, next) {
    try {
        const { roomNumber, buildingNumber, roomType } = req.body;
        const query1 = {
            "roomNumber": roomNumber,
            "buildingNumber": buildingNumber,
            "roomType": roomType
        }
        const validateCheck = await validationChecker(validationController.addNewRoomSchema, req.body)
        if (!validateCheck) {
            return httpResponseHandlerError(
                res,
                400,
                "invalid validation"
            )
        }
        const roomAldreadyExists = await findOne(roomDetailsSchema.roomDetails, { "roomNumber": roomNumber, "buildingNumber": buildingNumber, "roomType": roomType })
        if (roomAldreadyExists) {
            return httpResponseHandlerError(
                res,
                400,
                "room aldready exists"
            )
        }
        else if (!roomAldreadyExists) {
            const addNewRoom = await create(roomDetailsSchema.roomDetails, query1)
            if (!addNewRoom) {
                return httpResponseHandlerError(
                    res,
                    400,
                    "error while Adding New Room"
                )
            }
            res.status(200).json({ message: "Success" })
            console.log("Room Added Successfully");
        }
    }
    catch (error) {

        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function deleteRoom(req, res, next) {
    try {
        const { roomNumber, buildingNumber } = req.body;
        const query1 = {
            "roomNumber": roomNumber,
            "buildingNumber": buildingNumber
        }
        const validateCheck = await validationChecker(validationController.deleteRoomSchema, req.body)
        if (!validateCheck) {
            console.log("err1", error)
            return httpResponseHandlerError(
                res,
                400,
                "invalid validation"
            )
        }
        const roomAldreadyExists = await findOne(roomDetailsSchema.roomDetails, query1)
        if (!roomAldreadyExists) {
            console.log(error);
            return httpResponseHandlerError(
                res,
                400,
                "room does not exists"
            )
        } else {
            const deleteRoom = await update(roomDetailsSchema.roomDetails, { "roomNumber": roomNumber, "buildingNumber": buildingNumber }, { $set: { "isDelete": true, "roomActive": false, "checkInDate": null, "checkOutDate": null, "bookingId": null } })
            if (!deleteRoom) {
                return httpResponseHandlerError(
                    res,
                    400,
                    "error while Deleting Room"
                )
            }
            res.send("success")
        }
    }
    catch (error) {
        console.log(error)
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function editRoom(req, res, next) {
    try {
        const { roomNumber, buildingNumber, roomType } = req.body;
        const query1 = {
            "roomNumber": roomNumber,
            "buildingNumber": buildingNumber
        }
        const validateCheck = await validationChecker(validationController.editRoomSchema, req.body)
        if (!validateCheck) {
            return httpResponseHandlerError(
                res,
                400,
                "invalid validation"
            )
        }
        let editroom = ""
        const roomAldreadyExists = await findOne(roomDetailsSchema.roomDetails, query1)
        if (!roomAldreadyExists) {
            return httpResponseHandlerError(
                res,
                400,
                "room does not exists"
            )
        } else {
            editroom = await update(roomDetailsSchema.roomDetails, { "roomNumber": roomNumber, "buildingNumber": buildingNumber }, { $set: { "roomType": roomType } })
            if (!editroom) {
                return httpResponseHandlerError(
                    res,
                    400,
                    "error while editing Room"
                )
            }
        }
        res.json({ message: "room edited succesfully", "Existing Details": roomAldreadyExists, "Updated Details": editroom })
    }
    catch (error) {
        console.log(error)
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function viewRoom(req, res, next) {
    try {
        const { roomNumber, buildingNumber } = req.body;
        const query1 = {
            "roomNumber": roomNumber,
            "buildingNumber": buildingNumber
        }
        const validateCheck = await validationChecker(validationController.viewRoomSchema, req.body)
        if (!validateCheck) {
            return httpResponseHandlerError(
                res,
                400,
                "invalid validation"
            )
        }
        const roomAldreadyExists = await findOne(roomDetailsSchema.roomDetails, query1)
        if (!roomAldreadyExists) {

            return httpResponseHandlerError(
                res,
                400,
                "room does not exists"
            )
        } else {
            console.log(roomAldreadyExists);
            res.json({ message: "room Found", data: roomAldreadyExists })
        }
    }
    catch (error) {

        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}

async function deleteAdmin(req, res, next) {
    try {
        const { adminFullName, adminEmailId } = req.body;
        const query1 = {
            "adminEmailId": adminEmailId
        }
        const validateCheck = await validationChecker(validationController.deleteAdminSchema, req.body)
        if (!validateCheck) {
            return httpResponseHandlerError(
                res,
                400,
                "invalid validation"
            )
        }
        const adminAldreadyExists = await findOne(adminDetailsSchema.admindetails, query1)
        if (!adminAldreadyExists) {
            console.log(error);
            return httpResponseHandlerError(
                res,
                400,
                "admin does not exists"
            )
        } else {
            const deleteAdmin = await update(adminDetailsSchema.admindetails, { "adminFullName": adminFullName, "adminEmailId": adminEmailId }, { $set: { "isDelete": true } })
            if (!deleteAdmin) {
                return httpResponseHandlerError(
                    res,
                    400,
                    "error while Deleting admin"
                )
            }
            res.json({ message: "admin deleted succesfully" })

        }
    }
    catch (error) {
        console.log(error)
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function viewAdmin(req, res, next) {
    try {
        const {  adminEmailId } = req.body;
        const query1 = {
            "adminEmailId": adminEmailId
        }
        const validateCheck = await validationChecker(validationController.viewAdminSchema, req.body)
        if (!validateCheck) {
            return httpResponseHandlerError(
                res,
                400,
                "invalid validation"
            )
        }
        const adminAldreadyExists = await findOne(adminDetailsSchema.admindetails, query1)
        if (!adminAldreadyExists) {
            console.log(error);
            return httpResponseHandlerError(
                res,
                400,
                "admin does not exists"
            )
        } else {
            console.log(adminAldreadyExists);
            res.json({ message: "admin found", data: adminAldreadyExists })
        }
    }
    catch (error) {
        console.log(error)
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function editAdmin(req, res, next) {
    try {
        const { adminMobileNumber, adminEmailId, adminFullName, adminGender, adminBirthDate, adminAddress, buildingNumber, role } = req.body;
        const query1 = {
            "adminEmailId": adminEmailId
        }
        const validateCheck = await validationChecker(validationController.editAdminSchema, req.body)
        if (!validateCheck) {
            return httpResponseHandlerError(
                res,
                400,
                "invalid validation"
            )
        }
        const adminAldreadyExists = await findOne(adminDetailsSchema.admindetails, query1)
        if (!adminAldreadyExists) {
            console.log(error);
            return httpResponseHandlerError(
                res,
                400,
                "admin does not exists"
            )
        }
        const editAdmin = await update(adminDetailsSchema.admindetails, { "adminEmailId": adminEmailId }, { $set: { "adminFullName": adminFullName, "adminMobileNumber": adminMobileNumber, "adminGender": adminGender, "adminBirthDate": adminBirthDate, "adminAddress": adminAddress, "role": role, "buildingNumber": buildingNumber } })
        if (!editAdmin) {
            return httpResponseHandlerError(
                res,
                400,
                "error while editing admin"
            )
        } else {
            res.json({ message: "admin edited succesfully", "Existing Details": adminAldreadyExists, "Updated Details": editAdmin })
        }
    }
    catch (error) {
        console.log(error)
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function addNewBooking(req, res, next) {
    try {
        const { roomNumber, buildingNumber, guestFullName, guestMobileNumber, guestEmailId, comingFrom, goingTo, checkInDate, checkOutDate } = req.body;
        const offset = new Date().getTimezoneOffset();
        const convertedCID = Date.parse(checkInDate) - offset * 60 * 1000;
        const convertedCOD = Date.parse(checkOutDate) - offset * 60 * 1000;
        const CID = new Date(convertedCID).toISOString();
        const COD = new Date(convertedCOD).toISOString();

        const query = {
            "roomNumber": roomNumber,
            "buildingNumber": buildingNumber,
            "guestFullName": guestFullName,
            "guestEmailId": guestEmailId,
            "guestMobileNumber": guestMobileNumber,
            "comingFrom": comingFrom,
            "goingTo": goingTo,
            "checkInDate": CID,
            "checkOutDate": COD,
        }
        const validateCheck = await validationChecker(validationController.addNewBookingSchema, req.body)
        if (!validateCheck) {
            return httpResponseHandlerError(
                res,
                400,
                "invalid validation"
            )
        }
        const bookingExists = await findQuery(bookingDetailsSchema.bookingdetails, { "roomNumber": roomNumber, "buildingNumber": buildingNumber, "guestEmailId": { $in: guestEmailId }, "isDelete": false })
        console.log(bookingExists)
        if (bookingExists.length != 0) {

            return httpResponseHandlerError(
                res,
                400,
                "Booking Exists "
            )
        }
        else {
            const addNewBooking = await create(bookingDetailsSchema.bookingdetails, query)
            const updateRoom = await update(roomDetailsSchema.roomDetails, { "roomNumber": roomNumber, "buildingNumber": buildingNumber }, { $set: { "checkInDate": CID, "checkOutDate": COD, "roomActive": true, "bookingId": addNewBooking._id } });
            const updateGuest = await updateMany(guestDetailsSchema.guestdetails, { "guestEmailId": { $in: guestEmailId } }, { $set: { "isActive": true, "bookingId": addNewBooking._id } });
            if (!addNewBooking || !updateRoom || !updateGuest) {
                return httpResponseHandlerError(
                    res,
                    400,
                    "error in creating new booking"
                )
            }
            res.json({ message: "success" })
            console.log("booking added successfully");
        }
    }
    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }

}
async function editBooking(req, res, next) {
    try {
        const { _id, roomNumber, guestFullName, guestMobileNumber, guestEmailId, buildingNumber, comingFrom, goingTo, checkInDate, checkOutDate} = req.body;
        const query = {
            "_id": _id
        }
        const validateCheck = validationChecker(validationController.editBookingSchema, req.body)
        if (!validateCheck) {
            return httpResponseHandlerError(
                res,
                400,
                "invalid validation"
            )
        }
        const bookingExists = await findQuery(bookingDetailsSchema.bookingdetails, query)
        if (!bookingExists.length != 0) {
            return httpResponseHandlerError(
                res,
                400,
                "Booking Does Not Exists "
            )
        } else {
            const resetRoom = await update(roomDetailsSchema.roomDetails, { "bookingId": _id }, { $set: { "roomActive": false, "checkInDate": null, "checkOutDate": null, "bookingId": null } });
            const resetGuest = await updateMany(guestDetailsSchema.guestdetails, { "bookingId": _id }, { $set: { "isActive": false, "bookingId": null } });
            const updateBooking = await update(bookingDetailsSchema.bookingdetails, { "_id": _id }, { $set: { "guestFullName": guestFullName, "guestMobileNumber": guestMobileNumber, "guestEmailId": guestEmailId, "comingFrom": comingFrom, "goingTo": goingTo, "checkInDate": checkInDate, "checkOutDate": checkOutDate, "roomNumber": roomNumber, "buildingNumber": buildingNumber } });
            const updateRoom = await update(roomDetailsSchema.roomDetails, { "roomNumber": roomNumber, "buildingNumber": buildingNumber }, { $set: { "checkInDate": checkInDate, "checkOutDate": checkOutDate,  "roomActive": true, "bookingId": _id } });
            const updateGuest = await updateMany(guestDetailsSchema.guestdetails, { "guestEmailId": { $in: guestEmailId } }, { $set: { "isActive": true, "bookingId": _id } });
            if (!updateBooking || !updateRoom || !updateGuest || !resetRoom || !resetGuest) {
                console.log(error);
                return httpResponseHandlerError(
                    res,
                    400,
                    "error in editing booking"
                )
            }
            res.json({ message: "booking edited successfully", "Existing Details": bookingExists, "Updated Details": updateBooking })
            console.log("booking edited successfully");
        }
    }
    catch (error) {
        console.log(error)
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function deleteBooking(req, res, next) {
    try {
        const { _id } = req.body;
        const validateCheck = await validationChecker(validationController.deleteBookingSchema, req.body)
        if (!validateCheck) {
            return httpResponseHandlerError(
                res,
                400,
                "invalid validation"
            )
        }
        const bookingExists = await findOne(bookingDetailsSchema.bookingdetails, { "_id": _id })
        if (!bookingExists.length != 0) {
            return httpResponseHandlerError(
                res,
                400,
                "Booking details doesn't exist"
            )
        }
        else {
            const updateBooking = await update(bookingDetailsSchema.bookingdetails, { "_id": _id }, { $set: { "isDelete": true } })
            const updateRoom = await update(roomDetailsSchema.roomDetails, { "bookingId": _id }, { $set: { "checkInDate": null, "checkOutDate": null,  "roomActive": false, "bookingId": null } });
            const updateGuest = await update(guestDetailsSchema.guestdetails, { "bookingId": _id }, { $set: { "isActive": false, "bookingId": null } });
            if (!updateBooking || !updateRoom || !updateGuest) {
                console.log(error);
                return httpResponseHandlerError(
                    res,
                    400,
                    "error in deleting booking"
                )
            }
            res.json({ message: "success" })
            console.log("booking deleted successfully");
        }
    }
    catch (error) {
        console.log(error)
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
async function viewBooking(req, res, next) {
    try {
        const { _id } = req.body;
        const query1 = {
            "_id": _id,
        }
        const validateCheck = await validationChecker(validationController.viewBookingSchema, req.body)
        if (!validateCheck) {
            return httpResponseHandlerError(
                res,
                400,
                "invalid validation"
            )
        }
        const Bookingexist = await findOne(bookingDetailsSchema.bookingdetails, query1)
        if (!Bookingexist) {
            return httpResponseHandlerError(
                res,
                400,
                "booking does not exist")
        } else {
            res.json({ message: "booking details fetched successfully", data: Bookingexist })
        }

    }
    catch (error) {
        console.log(error);
        return httpResponseHandlerError(
            res,
            400,
            "error"
        )
    }
}
module.exports = { addNewBooking, editBooking, deleteAdmin, viewAdmin, editAdmin, viewRoom, addNewRoom, editRoom, deleteRoom, setNewPassword, forgotPassword, loginUser, logout, signup, addBuildingDetails, deleteBuildingDetails, deleteBooking, getAllBuildingDetails, editBuildingDetails, getAllBookingDetails, viewBuilding, viewBooking, addGuest, viewGuestDetails, editGuest, deleteGuest, getAllGuestDetails, getAllAdminDetails, getAllRoomDetails };