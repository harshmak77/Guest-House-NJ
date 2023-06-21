const { logger } = require('elastic-apm-node');
const {
    Query
} = require('mongoose');
const mongoDb = require("../../utils/database/mongoDb")
// const adminInfo = require("../../models/Master/adminDetails")

function test(req) {
    return new Promise(function (resolve, reject) {
        try {
            // let pipelineId = req.query.pipelineId;
            let mongoModel = landscapeModel.guestHouseSchema;
            mongoModel.create({
                fullName: "Sayalee Thakur",
                emailId: "Sayalee@gmail.com",
                mobileNumber: "98765675676",
                password: "sayalee@123"
            }).then(result => {
                console.log("REs", result);
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}
function buildingInfo(req) {
    return new Promise(function (resolve, reject) {
        try {
            // let pipelineId = req.query.pipelineId;
            let mongoModel = buildingInfo.buildingDetailsSchema;
            mongoModel.create({
                buildingNumber: 1234,
                adminName: "neetaa",
                adminId: 1,
                ownerName: "aman",
                ownerId: 11

            }).then(result => {
                console.log("REsult", result);
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}

function roomInfo(req) {
    return new Promise(function (resolve, reject) {
        try {
            // let pipelineId = req.query.pipelineId;
            let mongoModel = roominfo.roomDetailsSchema;
            mongoModel.create({
                roomNumber: 1,
                buildingNumber: 5,
                roomType: "PREMIUM",
                roomActive: true,
                isDelete: false,
                checkInDate: "1/4/22",
                checkInTime: "4:30PM",
                checkOutDate: "22/4/22",
                checkOutTime: "5:30AM",
            }).then(result => {
                console.log("REsult", result);
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}

function roomTypeInfo(req) {
    return new Promise(function (resolve, reject) {
        try {
            // let pipelineId = req.query.pipelineId;
            let mongoModel = roomType.roomDetailsSchema;
            mongoModel.create({
                roomName: "PREMIUM",
                bedCount: 5,
                attachedBathroom: true,
                airConditioner: true,
                geysor: true,
                balcony: true

            }).then(result => {
                console.log("REsult", result);
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}

function guestInfo(req) {
    return new Promise(function (resolve, reject) {
        try {
            // let pipelineId = req.query.pipelineId;
            let mongoModel = guestInfo.guestDetailsSchema;
            mongoModel.create({
                guestFullName: "Sayalee Thakur",
                guestEmailId: "Sayalee@gamil.com",
                guestMobileNumber: "98765675676",
                guestGender: "MALE",
                guestBirthDate: "3/10/02",
                guestIdProofType: "drivingLicense",
                guestIdProofNumber: 11111111,
                guestAddress: "kandivali",
                vehicleNumber: "MH47M3433",
                isDelete: false
            }).then(result => {
                console.log("REs", result);
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}

function adminInfo(req) {
    return new Promise(function (resolve, reject) {
        try {
            // let pipelineId = req.query.pipelineId;
            let mongoModel = admininfo.adminDetailsSchema;
            mongoModel.create({
                adminFullName: "Sayalee Thakur",
                adminEmailId: "Sayalee@gmail.com",
                adminMobileNumber: "98765675676",
                adminGender: "MALE",
                adminBirthDate: "3/10/02",
                adminIdProofType: "drivingLicense",
                adminIdProofNumber: 11111111,
                adminAddress: "kandivali",
                role: "ADMIN",
                buildingNumber: "MH47M3433",
                isDelete: false
            }).then(result => {
                console.log(result);
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}

function bookingInfo(req) {
    return new Promise(function (resolve, reject) {
        try {
            // let pipelineId = req.query.pipelineId;
            let mongoModel = bookingInfo.buildingDetailsSchema;
            mongoModel.create({
                roomNumber: 204,
                buildingNumber: 2,
                guestFullName: "sayalee",
                guestMobileNumber: 282828282,
                comingFrom: "mumbai",
                goingTo: "pune",
                isDelete: false,
                checkInDate: "1/4/22",
                checkInTime: "4:30PM",
                checkOutDate: "22/4/22",
                checkOutTime: "5:30AM"
            }).then(result => {
                console.log("REs", result);
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}


function getSAPSystemDetails(req) {
    return new Promise(function (resolve, reject) {
        try {
            let pipelineId = req.query.pipelineId;
            let mongoModel = landscapeModel.mstrSapLandscape;
            mongoModel.find({
                pipelineID: pipelineId
            }).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports.find = async (model, query) => {
    return await model.find(query);
}

module.exports.insert = async (model, data) => {
    return await model.insertMany(data);
}

module.exports.update = async (model, query, data) => {
    return await model.updateMany(query, data, {
        new: true,
        upsert: false
    });
}

module.exports.aggregate = async (model, query) => {
    return await model.aggregate(query);
}


async function update(model, query, data) {
    return new Promise(async (resolve, reject) => {
        try {
            model.updateOne(query, data, {
                new: true,
                upsert: false
            }, function (error, response) {
                mongoDb.release(model);
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

async function findOne(model, query) {
    return new Promise(async (resolve, reject) => {
        try {
            model.findOne(query, function (error, response) {
                mongoDb.release(model);
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
async function find(model, query) {
    return new Promise(async (resolve, reject) => {
        try {
            model.find(query, function (error, response) {
                mongoDb.release(model);
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}


async function create(model, query) {
    return new Promise(async (resolve, reject) => {
        try {
            model.create(query, function (error, response) {
                mongoDb.release(model);
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

async function findQuery(model, query) {
    return new Promise(async (resolve, reject) => {
        try {
            model.find(query, function (error, response) {
                console.log(response);
                mongoDb.release(model);
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

async function callAggregate(model, query) {
    return new Promise(async (resolve, reject) => {
        try {
            model.aggregate(query, function (error, response) {
                mongoDb.release(model);
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

module.exports.insertMany = async (model, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            model.insertMany(data, function (error, response) {
                mongoDb.release(model);
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
module.exports.deleteMany = async (model, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            model.deleteMany(data, function (error, response) {
                mongoDb.release(model);
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
async function updateMany(model, query, data) {
    return await model.updateMany(query, data, {
        new: true,
        upsert: false
    });
}
module.exports.getSAPSystemDetails = getSAPSystemDetails;
module.exports = { test, updateMany, buildingInfo, roomInfo, roomTypeInfo, guestInfo, adminInfo, bookingInfo, findOne, find, update, findQuery, create, callAggregate };
