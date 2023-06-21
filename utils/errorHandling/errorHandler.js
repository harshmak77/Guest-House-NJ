'use strict';
const operationCodesJson = require('../commons/operationCodes');
const errorCodeJson = require('./errorCode');

function error500(error, res) {
    let errReponse = {
        errorText: error.error,
        messageObj: {
            message: errorCodeJson.ERROR_MSG_MONGO_INSERT_FAILED.msg,
            duration: 4000,
            type: operationCodesJson.OPERATION_FAILED_CODE.msg
        }
    }
    res.status(500).send(errReponse);
}

function error400(error, res) {
    let errReponse = {
        errorText: error,
        messageObj: {
            message: errorCodeJson.ERROR_MSG_MONGO_INSERT_FAILED.msg,
            duration: 4000,
            type: operationCodesJson.OPERATION_FAILED_CODE.msg
        }
    }
    return res.status(400).send(errReponse)
}

function error400_DBFetch(error, res) {
    // console.log('error400_DBFetch --->')
    let errReponse = {
        errorText: error,
        messageObj: {
            message: errorCodeJson.ERROR_MSG_MONGO_FETCH_FAILED.msg,
            duration: 4000,
            type: operationCodesJson.OPERATION_FAILED_CODE.msg
        }
    }
    return res.status(400).send(errReponse)
}

function error400_adminOps(error, res) {
    let errReponse = {
        errorText: error.error,
        messageObj: {
            message: errorCodeJson.ERROR_MSG_ADMIN_OPS_FAILED.msg,
            duration: 4000,
            type: operationCodesJson.OPERATION_FAILED_CODE.msg
        }
    }
    return res.status(400).send(errReponse)
}

function error401(error, res) {
    let errReponse = {
        errorText: error.error,
        messageObj: {
            message: errorCodeJson.ERROR_MSG_UNAUTHORISED_ACCESS.msg,
            duration: 4000,
            type: operationCodesJson.OPERATION_FAILED_CODE.msg
        }
    }
    return res.status(401).send(errReponse)
}

function error403(error, res) {
    let errReponse = {
        errorText: error.error,
        messageObj: {
            message: errorCodeJson.ERROR_MSG_MONGO_INSERT_FAILED.msg,
            duration: 4000,
            type: operationCodesJson.OPERATION_FAILED_CODE.msg
        }
    }
    return res.status(403).send(errReponse)
}

function error404_DBFetch(queryResults, res) {
    let errReponse = {
        errorText: queryResults,
        messageObj: {
            message: errorCodeJson.ERROR_MSG_NO_DATA_FOUND.msg,
            duration: 4000,
            type: operationCodesJson.OPERATION_FAILED_CODE.msg
        }
    }
    return res.status(404).send(errReponse)
}

function error400_DBOps(error, res, message) {
    let errReponse = {
        errorText: error,
        messageObj: {
            message: message,
            duration: 4000,
            type: operationCodesJson.OPERATION_FAILED_CODE.msg
        }
    }
    return res.status(400).send(errReponse)
}

function error400_SearchOps(error, res, message) {
    let errReponse = {
        errorText: error,
        messageObj: {
            message: message,
            duration: 4000,
            type: operationCodesJson.OPERATION_FAILED_CODE.msg
        }
    }
    return res.status(400).send(errReponse)
}

function error400_DB(error, res) {
    let errReponse = {
        errorText: error,
        messageObj: {
            message: "Failed to connect to Database",
            duration: 4000,
            type: operationCodesJson.OPERATION_FAILED_CODE.msg
        }
    }
    return res.status(400).send(errReponse)
}

function error400Generic(error, res, message) {
    // console.log('error400Generic error ', error);
    let errReponse = {};
    if (error.message) {
        errReponse = {
            errorText: error.message,
            messageObj: {
                message: message,
                duration: 4000,
                type: operationCodesJson.OPERATION_FAILED_CODE.msg
            }
        }
    } else if (error.error) {
        if (error.error.message) {
            errReponse = {
                errorText: error.error.message,
                messageObj: {
                    message: message,
                    duration: 4000,
                    type: operationCodesJson.OPERATION_FAILED_CODE.msg
                }
            }
        }
    } else if (error.OPStatus) {
        errReponse = {
            errorText: error.OPStatus,
            messageObj: {
                message: message,
                duration: 4000,
                type: operationCodesJson.OPERATION_FAILED_CODE.msg
            }
        }
    }
    else {
        errReponse = {
            errorText: error,
            messageObj: {
                message: message,
                duration: 4000,
                type: operationCodesJson.OPERATION_FAILED_CODE.msg
            }
        }
    }
    return res.status(400).send(errReponse)
}

function error409(error, res) {
    let errReponse = {
        errorText: error,
        messageObj: {
            message: errorCodeJson.ERROR_MSG_DUPLICATE_DATA.msg,
            duration: 4000,
            type: operationCodesJson.OPERATION_FAILED_CODE.msg
        }
    }
    return res.status(409).send(errReponse)
}

function error422(error, res) {
    let errReponse = {
        errorText: error.replace(/\"/g, ""),
        messageObj: {
            message: error.replace(/\"/g, ""),
            duration: 4000,
            type: operationCodesJson.OPERATION_FAILED_CODE.msg
        }
    }
    return res.status(422).send(errReponse)
}

function errorHandler(error, res, message="") {
    if(error.errorCode == 401){
        error401(error, res)
    }else if(error.errorCode == 409) {
        error409(error, res)
    }else if(error.isJoi == true) {
        error422(error.message, res)
    }else{
        error400Generic(error, res, message)
    } 
}
module.exports.error500 = error500;
module.exports.error400 = error400;
module.exports.error400_DBFetch = error400_DBFetch;
module.exports.error401 = error401;
module.exports.error403 = error403;
module.exports.error404_DBFetch = error404_DBFetch;
module.exports.error400_DBOps = error400_DBOps;
module.exports.error400_adminOps = error400_adminOps;
module.exports.error400_SearchOps = error400_SearchOps;
module.exports.error400_DB = error400_DB;
module.exports.error400Generic = error400Generic;
module.exports.error409 = error409;
module.exports.error422 = error422;
module.exports.errorHandler = errorHandler;