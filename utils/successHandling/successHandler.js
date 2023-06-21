'use strict';
const operationCodesJson = require('../commons/operationCodes.json');
const successCodeJson = require('./successCode.json');

function success_200(response, res, message) {
    console.log(response)
    return res.status(200).send({
        document: response,
        messageObj: {
            message: message,
            duration: 4000,
            type: operationCodesJson.OPERATION_SUCCESS_CODE.msg
        }
    })
}

function success200SearchUserSelf(response, res, message) {
    return res.status(200).send({
        Response: response,
        messageObj: {
            message: message,
            duration: 4000,
            type: operationCodesJson.OPERATION_SUCCESS_CODE.msg
        }
    })
}

function success_200_user(response, res, message) {
    return res.status(200).send({
        userDetails: response,
        messageObj: {
            message: message,
            duration: 4000,
            type: operationCodesJson.OPERATION_SUCCESS_CODE.msg
        }
    })
}

function success_200_admin(response, res) {
    return res.status(200).send({
        document: response,
        messageObj: {
            message: successCodeJson.SUCCESS_MSG_ADMIN_OPERATION.msg,
            duration: 4000,
            type: operationCodesJson.OPERATION_SUCCESS_CODE.msg
        }
    })
}

function success_204(response, res, message) {
    return res.status(204).send({
        document: response,
        messageObj: {
            message: message,
            duration: 4000,
            type: operationCodesJson.OPERATION_SUCCESS_CODE.msg
        }
    })
}

function success_204_generic(queryResults, res, message) {
    let reponse = {
        document: queryResults,
        messageObj: {
            message: message,
            duration: 4000,
            type: operationCodesJson.OPERATION_FAILED_CODE.msg
        }
    }
    return res.status(204).send(reponse)
}

function success_200_generic(response, res, message) {
    let reponse = {
        document: response,
        messageObj: {
            message: message,
            duration: 4000,
            type: operationCodesJson.OPERATION_SUCCESS_CODE.msg
        }
    }
    return res.status(200).send(reponse);
}

function success_200_results(response, res, message) {
    return res.status(200).send({
        results: response,
        messageObj: {
            message: message,
            duration: 4000,
            type: operationCodesJson.OPERATION_SUCCESS_CODE.msg
        }
    })
}

module.exports.success_200 = success_200;
module.exports.success200SearchUserSelf = success200SearchUserSelf;
module.exports.success_200_user = success_200_user;
module.exports.success_204 = success_204;
module.exports.success_200_admin = success_200_admin;
module.exports.success_204_generic = success_204_generic;
module.exports.success_200_generic = success_200_generic;
module.exports.success_200_results = success_200_results;
