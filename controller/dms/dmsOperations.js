'use strict';
const config = require('../../config/config');
const _ = require('underscore');
const q = require('q')
const request = require('request');
let mongoose = require('mongoose');
const cookieAuth = require('../authorization/authorization');
const commonFunction = require('../commons/commonMethods');
const errorCodeJson = require('../../utils/errorHandling/errorCode.json');
const documentModel = require('../../models/documents/collection_documents');
const sopConstants = require('../../utils/commons/constantCodes.json');
mongoose.pluralize(null);
let stream = require('stream');
const {
    Duplex
} = stream;

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * This API uploads document and save reponse of user along with attachment
 */
async function uploadAttachmentToCR(req) {
    let deferred = q.defer();
    try {
        let checkListTypeCode = req.body.checkListTypeCode || "";
        let displayText = req.body.displayText || "";
        let releaseNum = req.body.releaseNum || "";
        let createdDatetemp = commonFunction.getCurrentDateTime();
        let createdDate = new Date(createdDatetemp);
        var userIdDetails = req.userInformation;

        // cookieAuth.getDomainID(req)
        //     .then(tempUserDetails => {
        //         userIdDetails = tempUserDetails;
        //         return 
        uploadAttachmentsToDMS(req.files)
            .then(uploadedFileStatus => {
                // console.log('uploadedFileStatus ->', uploadedFileStatus);
                if (uploadedFileStatus[0]) {
                    return checkFileUploadedMessages(uploadedFileStatus[0]);
                } else {
                    return checkFileUploadedMessages(uploadedFileStatus);
                }
            }).then(uploadedFileResponse => {
                if (Array.isArray(uploadedFileResponse) && uploadedFileResponse.length) {
                    let attachmentDetails = []
                    for (let respFile of uploadedFileResponse) {
                        attachmentDetails.push({
                            originalname: respFile.originalname,
                            filename: respFile.filename,
                            mimetype: respFile.mimetype,
                            uploadedById: userIdDetails.domainID,
                            uploadedByName: userIdDetails.fullName,
                            uploadedByEmailID: userIdDetails.emailID,
                            uploadedDate: createdDate,
                            checkListType: {
                                code : checkListTypeCode,
                                displayText : displayText,
                                releaseNum : releaseNum
                            },
                            isDeleted: 0
                        });
                    }
                    return attachmentDetails
                } else {
                    return
                }

            }).then(response => {
                if (response) {
                    deferred.resolve(response);
                } else {
                    // send 204 no data updated
                    deferred.reject(errorCodeJson.ERROR_FILE_TYPE.msg);
                }
            }).catch(error => {
                if (error > 0) {
                    deferred.reject(errorCodeJson.ERROR_OPERATION_ATTACHMENT_NOT_ALLOWED.msg);
                } else {
                    deferred.reject(error);
                }
            });
    } catch (error) {
        deferred.reject(error);
    }
    return deferred.promise;
}

async function uploadAttachmentsToDMS(files) {
    let deferred = q.defer();
    let uploadedFileDetails = [];
    try {
        if (files && files.length > 0) {
            traverseFiles(files)
                .then(tempDocRef => {
                    uploadedFileDetails.push(tempDocRef)
                    deferred.resolve(uploadedFileDetails);
                }).catch(error => {
                    uploadedFileDetails.push(error)
                    deferred.reject(uploadedFileDetails);
                });
        } else {
            deferred.resolve(uploadedFileDetails);
        }

    } catch (error) {
        uploadedFileDetails.push(error)
        deferred.reject(uploadedFileDetails);
    }
    return deferred.promise
}


async function traverseFiles(files) {
    let uploadedFileDetails = [];
    for (var file of files) {
        var tempResponse = await callUploadToDMSAPI(file);
        if (tempResponse != "") {
            uploadedFileDetails.push(tempResponse);
        }
    }
    return uploadedFileDetails;
}

async function callUploadToDMSAPI(fileDetails) {
    let deferred = q.defer();
    try {
        const originalname = fileDetails.originalname
        const fileValues = originalname.split('.');
        let fileExtn = fileValues[fileValues.length - 1];
        let extensionWhiteList = config.utils.extension;
        let attachmentWhitelist = config.utils.mimeType;
        if (fileValues.length > 1) {
            if ((attachmentWhitelist.indexOf(fileDetails.mimetype) === -1) && (extensionWhiteList.indexOf(fileExtn) === -1)) {
                deferred.resolve('');
            } else {
                let fileStream = bufferToStream(fileDetails.buffer);
                let options = {
                    method: 'POST',
                    url: config.url.dms.upload_url,
                    headers: {
                        'password': config.url.dms.upload_password
                    },
                    formData: {
                        folder_id: config.url.dms.upload_folder_ID,
                        file: {
                            value: fileStream,
                            options: {
                                filename: fileDetails.originalname,
                                contentType: fileDetails.mimetype,
                                knownLength: fileDetails.size
                            }
                        }
                    }
                }
                request(options, function (error, response, body) {
                    if (error) {
                        deferred.reject({
                            message: error,
                            status: false
                        })
                    } else {
                        if (!_.isEmpty(body)) {
                            let docInfo = JSON.parse(body)
                            deferred.resolve(docInfo)
                        } else {
                            deferred.reject({
                                message: docInfo,
                                status: false
                            })
                        }
                    }
                })
            }
        } else {
            deferred.resolve('');
        }

    } catch (error) {
        deferred.reject({
            message: error,
            status: false
        });
    }
    return deferred.promise
}


function bufferToStream(buffer) {
    const duplexStream = new Duplex();
    duplexStream.push(buffer)
    duplexStream.push(null)
    return duplexStream
}

async function checkFileUploadedMessages(uploadedFileStatus) {
    let fileUploadStatus = [];
    try {
        for (let status of uploadedFileStatus) {
            let tempFileData = await checkMessage(status);
            await fileUploadStatus.push(tempFileData);
        }
        return fileUploadStatus;
    } catch (error) {
        return fileUploadStatus.push(error);
    }
}

function checkMessage(body) {
    let deferred = q.defer()
    let status = body.OPStatus.StatusType
    if (status === 'S') {
        let data = body.data
        deferred.resolve(data);
    } else {
        deferred.reject({
            message: body.OPStatus.Message
        })
    }

    return deferred.promise
}

// async function downloadAttachment(req, res) {
//     let fileID = req.query.fileName;
//     try {
//         cookieAuth.getDomainID(req).then(() => {
//             let options = {
//                 method: 'GET',
//                 url: `${config.url.dms.download_token_url}/${fileID}`,
//                 headers: {
//                     'password': config.url.dms.upload_password
//                 }
//             }
//             request(options, function (error, response, body) {
//                 if (error) {
//                     return errorHandler.error400_DBOps(error, res, errorCodeJson.ERROR_MSG_FILE_DOWNLOAD_FAILED.msg);
//                 } else {
//                     if (!_.isEmpty(response.caseless.dict.filereq)) {
//                         return successHandler.success_200(response.caseless.dict.filereq, res, successCodeJson.SUCCESS_MSG_FILE_DOWNLOAD_SUCCESS.msg);
//                     } else {
//                         return errorHandler.error400_DBOps(body, res, errorCodeJson.ERROR_MSG_FILE_DOWNLOAD_FAILED.msg);
//                     }
//                 }
//             })
//         }).catch(error => {
//             return errorHandler.error400_DBOps(error, res, errorCodeJson.ERROR_MSG_FILE_DOWNLOAD_FAILED.msg);
//         });
//     } catch (error) {
//         return errorHandler.error400_DBOps(error, res, errorCodeJson.ERROR_MSG_FILE_DOWNLOAD_FAILED.msg);
//     }
// }

function getRSevaSOPDoc(req) {
    let deferred = q.defer();
    try {
        let document = documentModel.rsevaDocumentsCollection;
        cookieAuth.getDomainID(req)
            .then(() => {
                let searchParams = {};
                if (req.query.type != sopConstants.TICKET_STATUS_TYPE_ADMIN) {
                    searchParams = {
                        assignment_group: req.query.assignment_group,
                        service: req.query.service,
                        type: req.query.type,
                        isDeleted: false
                    }
                } else {
                    searchParams = {
                        assignment_group: req.query.assignment_group,
                        service: req.query.service,
                        isDeleted: false
                    }
                }
                return searchParams;
            }).then(resSearchParams => {
                return findSOPDoc(document, resSearchParams);
            }).then(response => {
                deferred.resolve(response);
            }).catch(error => {
                if (error > 0) {
                    deferred.reject(errorCodeJson.ERROR_OPERATION_ATTACHMENT_NOT_ALLOWED.msg);
                } else {
                    deferred.reject(error);
                }
            })
    } catch (error) {
        deferred.reject(error);
    }
    return deferred.promise;
}

function findSOPDoc(document, searchParams) {
    let deferred = q.defer();
    document.find(searchParams, function (error, queryResults) {
        if (error) {
            deferred.reject(error);
        } else {
            // deferred.resolve(queryResults);
            sopDocumentResponse(queryResults)
                .then(document => {
                    deferred.resolve(document);
                }).catch(error => {
                    deferred.reject(error);
                });
        }
    });
    return deferred.promise;
}

function sopDocumentResponse(queryResults) {
    let deferred = q.defer();
    try {
        let sopDocumentDetail = [];
        if (queryResults.length > 0) {
            for (let respFile of queryResults) {
                if (respFile.documentDetails) {
                    for (let doc of respFile.documentDetails) {
                        sopDocumentDetail.push({
                            originalname: doc.originalname,
                            filename: doc.filename,
                            mimetype: doc.mimetype,
                            uploadedById: doc.uploadedById,
                            uploadedByName: doc.uploadedByName,
                            uploadedByEmailID: doc.uploadedByEmailID,
                            uploadedDate: doc.uploadedDate,
                            isDeleted: doc.isDeleted
                        })
                    }
                }
            }
            let sopDocuments = {
                assignment_group: queryResults[0].assignment_group,
                service: queryResults[0].service,
                category: queryResults[0].category,
                role: queryResults[0].role,
                type: queryResults[0].type,
                isDeleted: false,
                documentDetails: sopDocumentDetail
            }
            deferred.resolve(sopDocuments);
        } else {
            deferred.resolve([]);
        }

    } catch (error) {
        console.log('error ', error);
        deferred.reject(error);
    }
    return deferred.promise;
}

function UploadDocumentToDMS(req) {
    let deferred = q.defer();
    try {
        let createdDatetemp = commonFunction.getCurrentDateTime();
        let createdDate = new Date(createdDatetemp);
        var userIdDetails = {};
        let document = documentModel.rsevaDocumentsCollection;
        cookieAuth.getDomainID(req)
            .then(tempUserDetails => {
                userIdDetails = tempUserDetails;
                return uploadAttachmentsToDMS(req.files);
            }).then(uploadedFileStatus => {
                // console.log('uploadedFileStatus ->', uploadedFileStatus);
                if (uploadedFileStatus[0]) {
                    return checkFileUploadedMessages(uploadedFileStatus[0]);
                } else {
                    return checkFileUploadedMessages(uploadedFileStatus);
                }
            }).then(uploadedFileResponse => {
                let sopDocument = []
                for (let respFile of uploadedFileResponse) {
                    sopDocument.push({
                        assignment_group: req.body.assignment_group,
                        service: req.body.service,
                        category: req.body.category,
                        role: req.body.role,
                        type: req.body.type,
                        isDeleted: false,
                        documentDetails: {
                            originalname: respFile.originalname,
                            filename: respFile.filename,
                            mimetype: respFile.mimetype,
                            uploadedById: userIdDetails.domainID,
                            uploadedByName: userIdDetails.fullName,
                            uploadedByEmailID: userIdDetails.emailID,
                            uploadedDate: createdDate,
                            isDeleted: false
                        }
                    })
                }
                // return new document(sopDocument);
                return sopDocument;
            }).then(sopDocuments => {
                return document.insertMany(sopDocuments);
            }).then(response => {
                deferred.resolve(response);
            }).catch(error => {
                console.log('error===> ', error)
                if (error > 0) {
                    deferred.reject(errorCodeJson.ERROR_OPERATION_ATTACHMENT_NOT_ALLOWED.msg);
                } else {
                    deferred.reject(error);
                }
            });
    } catch (error) {
        deferred.reject(error);
    }

    return deferred.promise;
}

async function uploadZCDDocToDMS(fileStream) {
    let deferred = q.defer();
    try {
        let options = {
            method: 'POST',
            url: config.url.dms.upload_url,
            headers: {
                'password': config.url.dms.upload_password
            },
            formData: {
                folder_id: config.url.dms.upload_folder_ID,
                file: {
                    value: fileStream.pdfStream,
                    options: {
                        filename: fileStream.originalname,
                        contentType: fileStream.mimetype,
                        knownLength: fileStream.size
                    }
                }
            }
        }
        request(options, function (error, response, body) {
            if (error) {
                deferred.reject({
                    message: error,
                    status: false
                })
            } else {
                if (!_.isEmpty(body)) {
                    let docInfo = JSON.parse(body)
                    deferred.resolve(docInfo)
                } else {
                    deferred.reject({
                        message: docInfo,
                        status: false
                    })
                }
            }
        })
    } catch (error) {
        deferred.reject({
            message: error,
            status: false
        });
    }
    return deferred.promise
}

// function deleteDocumentDetails(req) {
//     let deferred = q.defer();
//     try {
//         //let document = documentModel.rsevaDocumentsCollection;

//         let searchParams = {
//             assignment_group: req.body.assignment_group,
//             service: req.body.service,
//             documentDetails: {
//                 $elemMatch: {
//                     filename: req.body.filename
//                 }
//             }
//         }
//         // queryParms, updatparams, moduleSchema
//         let updatparams = {
//             isDeleted: true
//         }
//         // updateOps.findOneAndUpdateRecord(searchParams, updatparams, document)
//         //     .then(document => {
//         //         deferred.resolve(document);
//         //     }).catch(error => {
//         //         deferred.reject(error);
//         //     })
//     } catch (error) {
//         deferred.reject(error);
//     }
//     return deferred.promise;
// }


module.exports.uploadAttachmentToCR = uploadAttachmentToCR;
// module.exports.downloadAttachment = downloadAttachment;
module.exports.uploadAttachmentsToDMS = uploadAttachmentsToDMS;
module.exports.checkFileUploadedMessages = checkFileUploadedMessages;
module.exports.getRSevaSOPDoc = getRSevaSOPDoc;
module.exports.UploadDocumentToDMS = UploadDocumentToDMS;
module.exports.bufferToStream = bufferToStream;
module.exports.uploadZCDDocToDMS = uploadZCDDocToDMS;