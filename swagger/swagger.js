// /**
//  * @route GET /ping
//  * @group Test Connection - testing for successful connection
//  * @returns {object} 200 - An object of assignment group information
//  * @returns {object} 201 - Created
//  * @returns {object} 400 - Bad Request
//  * @returns {object} 401 - Unauthorized
//  * @returns {object} 404 - No Data Found
//  * @returns {object} 500 - Internal Server Error
//  */
// /**
//  * @typedef Error
//  * @property {string} message.required
//  */
// /**
//  * @typedef object
//  * @property {object} data.required
//  */

// /**
//  * @route GET /callTestRFC
//  * @group Test Connection - testing for successful connection
//  * @returns {object} 200 - An object of assignment group information
//  * @returns {object} 201 - Created
//  * @returns {object} 400 - Bad Request
//  * @returns {object} 401 - Unauthorized
//  * @returns {object} 404 - No Data Found
//  * @returns {object} 500 - Internal Server Error
//  */
// /**
//  * @typedef Error
//  * @property {String} message.required
//  */
// /**
//  * @typedef object
//  * @property {object} data.required
//  */

/**
 * @route GET /transportReq
 * @group Transport Collection - Transport Request collection
 * @param {string} crTicketNumber.query.required - crTicketNumber
 * @param {string} env.query - Environment
 * @returns {object} 201 - Created
 * @returns {object} 400 - Bad Request
 * @returns {object} 401 - Unauthorized
 * @returns {object} 404 - No Data Found
 * @returns {object} 500 - Internal Server Error
 */
/**
 * @typedef Error
 * @property {String} message.required
 */
/**
 * @typedef object
 * @property {object} data.required
 */

/**
 * @route GET /transportData
 * @group Transport Collection - Transport Request collection
 * @param {string} pipelineId.query.required - pipeline Id
 * @returns {object} 201 - Created
 * @returns {object} 400 - Bad Request
 * @returns {object} 401 - Unauthorized
 * @returns {object} 404 - No Data Found
 * @returns {object} 500 - Internal Server Error
 */
/**
 * @typedef Error
 * @property {string} message.required
 */
/**
 * @typedef object
 * @property {object} data.required
 */

/**
 * @route POST /transportReq
 * @group Transport Collection - Transport request collection
 * @param {transportReq.model} data.body.required - the transport request
 * @returns {object} 200 - An Array of objects reassigned tickets
 * @returns {object} 201 - Created
 * @returns {object} 400 - Bad Request
 * @returns {object} 401 - Unauthorized
 * @returns {object} 404 - No Data Found
 * @returns {object} 500 - Internal Server Error
 * @returns {Error}  default - Unexpected error
 */
/**
 * @typedef transportReq
 * @property {number} crTicketNumber.body.required - crTicketNumber
 * @property {Array.<landscapeClient>} landscapeClient.body.required - landscapeClient
 */

/**
 * @typedef landscapeClient
 * @property {string} sys.required - system SAP
 * @property {number} client.required - client SAP
 * @property {string} pipeline - pipeline
 * @property {string} pipelineId - pipelineId
 * @property {string} pipelineUrl - pipelineUrl
 * @property {string} description - description of task
 * @property {boolean} customizing - customizing flag
 * @property {boolean} workbench - workbench flag
 * @property {Array.<task>} task
 */
/**
 * @typedef task
 * @property {string} domainId.required - domainId of user
 * @property {string} employeeId - employeeId of user
 */
/**
 * @typedef Error
 * @property {string} message.required
 */
/**
 * @typedef object
 * @property {object} data.required
 */

/**
 * @route POST /releaseTransport
 * @group Transport Collection - Transport request collection
 * @param {releaseTransport.model}  data.body.required - transport body
 * @returns {object} 200 - An Array of objects reassigned tickets
 * @returns {object} 201 - Created
 * @returns {object} 400 - Bad Request
 * @returns {object} 401 - Unauthorized
 * @returns {object} 404 - No Data Found
 * @returns {object} 500 - Internal Server Error
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef releaseTransport
 * @property {string} crTicketNumber.required - the cr Ticket Number
 * @property {Array.<string>} TransportReqs - the transport data
 */

// /**
//  * @typedef TransportReq
//  * @property {object} data.required
//  */

/**
 * @typedef Error
 * @property {string} message.required
 */
/**
 * @typedef object
 * @property {object} data.required
 */

/**
 * @route POST /releasePipeline
 * @group Transport Collection - Transport request collection
 * @param {releasePipeline.model}  data.body.required - transport body
 * @returns {object} 200 - An Array of objects reassigned tickets
 * @returns {object} 201 - Created
 * @returns {object} 400 - Bad Request
 * @returns {object} 401 - Unauthorized
 * @returns {object} 404 - No Data Found
 * @returns {object} 500 - Internal Server Error
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef releasePipeline
 * @property {string} crTicketNumber.required - the cr Ticket Number
 * @property {Array.<transport>} transportRequests - the transport data
 */

/**
 * @typedef transport
 * @property {string} TRNUM.required - transport Request No
 */

/**
 * @typedef Error
 * @property {string} message.required
 */
/**
 * @typedef object
 * @property {object} data.required
 */

/**
 * @route GET /landscape
 * @group landscape Collection - landscape Request collection
 * @returns {object} 201 - Created
 * @returns {object} 400 - Bad Request
 * @returns {object} 401 - Unauthorized
 * @returns {object} 404 - No Data Found
 * @returns {object} 500 - Internal Server Error
 */
/**
 * @typedef Error
 * @property {string} message.required
 */
/**
 * @typedef object
 * @property {object} data.required
 */

/**
 * @route POST /landscape
 * @group landscape Collection - create and update landscape Request collection
 * @param {landscape.model} data.body.required - create and update landscape Request
 * @returns {landscape.model} 200 - An object of craeted and updated landscope
 * @returns {object} 201 - Created
 * @returns {object} 400 - Bad Request
 * @returns {object} 401 - Unauthorized
 * @returns {object} 404 - No Data Found
 * @returns {object} 500 - Internal Server Error
 */
/**
 * @typedef landscape
 * @property {string} Objectid - the Objectid (Used when need to be update)
 * @property {string} landscapeLabel.required - the landscapeLabel
 * @property {number} client.required - the client
 * @property {string} landscapeType.required - the landscapeType
 * @property {string} AppServer.required - the AppServer
 * @property {string} sysID.required - the sysID
 * @property {string} instanceNumber.required - the instanceNumber
 * @property {string} userID.required - the userID
 * @property {string} pwd.required - the pwd
 * @property {string} projectId.required - the projectId
 * @property {string} description - the description
 * @returns {object} 200 - An object of landscape
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */

/**
 * @route POST /deleteLandscape
 * @group landscape Collection - landscape Request collection
 * @param {deleteLandscape.model} data.body.required - the data
 * @returns {object} 200 - An object of deleted landscape
 * @returns {object} 201 - Created
 * @returns {object} 400 - Bad Request
 * @returns {object} 401 - Unauthorized
 * @returns {object} 404 - No Data Found
 * @returns {object} 500 - Internal Server Error
 * @returns {Error}  default - Unexpected error
 */
/**
 * @typedef deleteLandscape
 * @property {string} object_id.required - the object id
 * @returns {object} 200 - An object of user response of landscape
 * @returns {Error}  default - Unexpected error
 */
/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */

/**
 * @route GET /serverList
 * @group landscape Collection - landscape Request collection
 * @param {string} type.query.required - Landscape Type
 * @returns {object} 201 - Created
 * @returns {object} 400 - Bad Request
 * @returns {object} 401 - Unauthorized
 * @returns {object} 404 - No Data Found
 * @returns {object} 500 - Internal Server Error
 */
/**
 * @typedef Error
 * @property {string} message.required
 */
/**
 * @typedef object
 * @property {object} data.required
 */

/**
 * @route POST /importTransportReq
 * @group TR Operations - TR Operations collection
 * @param {importTransportReq.model} data.body.required - the data
 * @returns {object} 200 - An object of deleted landscape
 * @returns {object} 201 - Created
 * @returns {object} 400 - Bad Request
 * @returns {object} 401 - Unauthorized
 * @returns {object} 404 - No Data Found
 * @returns {object} 500 - Internal Server Error
 * @returns {Error}  default - Unexpected error
 */
/**
 * @typedef importTransportReq
 * @property {string} transportRequest.required - the transportRequest
 * @property {string} environment.required - the transportRequest
 * @returns {object} 200 - An object of user response of landscape
 * @returns {Error}  default - Unexpected error
 */
/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */

/**
* @route POST /checklist
* @group checklist Collection - update checklist Request collection
* @param {checklist.model} data.body.required - update checklist Request
* @returns {checklist.model} 200 - An object of updated checklist
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/
/**
 * @typedef checklist
 * @property {string} transportRequest.required - the transportRequest
 * @property {Array} checkListStatus.required - the checkListStatus (Used when need to be update)
 * @returns {object} 200 - An object of checklist
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */
/**
* @route GET /checklist
* @group checklist Collection - checklist Request collection
* @param {string} transportRequest.query.required - transportRequest
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/
/**
 * @typedef Error
 * @property {string} message.required
 */
/**
 * @typedef object
 * @property {object} data.required
 */
/**
 * @route POST /checklistDocument
 * @group checklist Collection - checklist Request collection
 * @consumes multipart/form-data
 * @param {number} crTicketNumber.formData - the crTicketNumber in case of CR
 * @param {string} checkListTypeCode.formData - the checkListTypeCode in case of CR
 * @param {string} displayText.formData - the displayText in case of CR
 * @param {string} releaseNum.formData - the releaseNum in case of CR
 * @param {file} files.formData.required- the files
 * @returns {object} 200 - An object of uploaded document
 * @returns {object} 201 - Created
 * @returns {object} 400 - Bad Request
 * @returns {object} 401 - Unauthorized
 * @returns {object} 404 - No Data Found
 * @returns {object} 500 - Internal Server Error
 * @returns {Error}  default - Unexpected error
 */
/**
 * @returns {object} 200 - An object of user response of Itcm
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */

 /**
 * @route POST /createPDF
 * @group PDF Collection - PDF request collection
 * @param {createPDF.model} data.body.required - update checklist Request
 * @returns {createPDF.model} 200 - An object of updated checklist
 * @returns {object} 201 - Created
 * @returns {object} 400 - Bad Request
 * @returns {object} 401 - Unauthorized
 * @returns {object} 404 - No Data Found
 * @returns {object} 500 - Internal Server Error
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef createPDF
 * @property {Array.<pdfData>} pdfData
 */

/**
 * @typedef pdfData
 * @property {string} TYPE.required - TYPE
 * @property {string} OBJECT.required - OBJECT
 * @property {string} OBJ_NAME.required - OBJ_NAME
 * @property {string} QA_REQ.required - transport Request No
 * @property {string} QA_VER.required - transport Request No
 * @property {string} PD_REQ.required - transport Request No
 * @property {string} PD_VER.required - transport Request No
 * @property {string} LOCK_REQ.required - transport Request No
 * @property {string} LOCK_VER.required - transport Request No
 * @property {string} LOCK_CD.required - transport Request No
 * @property {string} REMARKS.required - transport Request No
 * @property {string} WHERE_USED_TEXT.required - transport Request No
 * 
 */

/**
* @typedef Error
* @property {string} message.required
*/
/**
 * @typedef object
 * @property {object} data.required
 */

 /**
 * @route POST /tmsAction
 * @group TMS Action Collection - tms action actionrt request collection
 * @param {tmsActionReq.model} data.body.required - the tms action request
 * @returns {object} 200 - An Array of objects reassigned tickets
 * @returns {object} 201 - Created
 * @returns {object} 400 - Bad Request
 * @returns {object} 401 - Unauthorized
 * @returns {object} 404 - No Data Found
 * @returns {object} 500 - Internal Server Error
 * @returns {Error}  default - Unexpected error
 */
/**
 * @typedef tmsActionReq
 * @property {string} modelLabel.body.required - modelLabel
 * @property {number} modelId.body.required - modelId
 * @property {Array.<TMSAction>} TMSAction.body.required - TMSAction
 */

/**
 * @typedef TMSAction
 * @property {number} seqNo.required - seqNo
 * @property {string} displayName.required - displayName
 * @property {Object.<role>} role - role
 * @property {Array.<checklist>} checklist
 */
/**
 * @typedef role
 * @property {string} id.required - id
 * @property {string} description - description
 */
/**
 * @typedef checklist
 * @property {string} srno.required - code
 * @property {string} displayText - displayText
 * @property {Array.<options>} options - the transport data
 * @property {Array.<attachmentTag>} attachmentTag
 */

 /**
 * @typedef attachmentTag
 * @property {string} code.required - code
 * @property {string} displayText - displayText
 */
/**
 * @typedef Error
 * @property {string} message.required
 */
/**
 * @typedef object
 * @property {object} data.required
 */
/**
* @route POST /buildCheckList
* @group checklist Collection - build checklist Request collection
* @param {buildCheckList.model} data.body.required - buildCheckList Request
* @returns {buildCheckList.model} 200 - An object of buildCheckList
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/
/**
 * @typedef buildCheckList
 * @property {Array.<string>} trNumber.required - the transport data
 * @returns {object} 200 - An object of checklist
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */

 /**
 * @route GET /tmsAction
 * @group TMS Action Collection - tms action actionrt request collection
 * @returns {object} 201 - Created
 * @returns {object} 400 - Bad Request
 * @returns {object} 401 - Unauthorized
 * @returns {object} 404 - No Data Found
 * @returns {object} 500 - Internal Server Error
 */
/**
 * @typedef Error
 * @property {string} message.required
 */
/**
 * @typedef object
 * @property {object} data.required
 */

 /**
* @route GET /gateCheckList
* @group checklist Collection - checklist Request collection
* @param {number} crTicketNumber.query.required - crTicketNumber
* @param {string} releaseNumber.query.required - releaseNumber
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/
/**
 * @typedef Error
 * @property {string} message.required
 */
/**
 * @typedef object
 * @property {object} data.required
 */

 /**
* @route POST /gateCheckList
* @group checklist Collection - gate checklist Request collection
* @param {gateCheckList.model} data.body.required - gateCheckList Request
* @returns {gateCheckList.model} 200 - An object of gateCheckList
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/
/**
 * @typedef gateCheckList
 * @property {string} crTicketNumber.required - the crTicketNumber data
 * @property {string} releaseNumber.required - the releaseNumber data
 * @property {string} seqNo.required - the seqNo data
 * @property {string} displayName.required - the displayName data
 * @property {boolean} gatePassed - the gatePassed data
 * @property {Array.<checkList>} checklist.required - the checklist data
 * @returns {object} 200 - An object of checklist
 * @returns {Error}  default - Unexpected error
 */
/**
 * @typedef checkList
 * @property {string} srno - srno
 * @property {string} value - value
 * @property {string} attachment - attachment
 * @property {string} comments - comments
 */

/**
 * @typedef Error
 * @property {string} message.required
 */

/**
* @route GET /qatransportedlist
* @group TR Operations - TR Operations collection
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/

/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */


 /**
* @route POST /searchSAPUsers
* @group Utility - Utility collection
* @param {searchSAPUsers.model} data.body.required - searchSAPUsers Request
* @returns {object} 200 - An object of User Details
 */
/**
 * @typedef searchSAPUsers
 * @property {string} userName.required - the crTicketNumber data
 * @property {string} server.required - the releaseNumber data
 * @property {string} client.required - the seqNo data
 * @returns {object} 200 - An object of checklist
 */

/**
 * @typedef Error
 * @property {string} message.required
 */

/**
* @route POST /crcheckTransport
* @group Utility - Utility collection
* @param {crcheckTransport.model} data.body.required - crcheckTransport Request
* @returns {object} 200 - An object of User Details
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/
/**
 * @typedef crcheckTransport
 * @property {string} transportRequest.required - the crTicketNumber data
 * @property {boolean} AttachmentFlag - AttachmentFlag
 * @returns {object} 200 - An object of checklist
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef Error
 * @property {string} message.required
 */

/**
* @route POST /releaseMergeStatusSap
* @group Transport Collection - Transport Request collection
* @param {releaseMergeStatusSap.model} data.body.required - crcheckTransport Request
* @returns {object} 200 - An object of User Details
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/
/**
 * @typedef releaseMergeStatusSap
 * @property {Array.<string>} ET_RETURN.required - the ET_RETURN data
 * @property {string} EX_REQUEST.required - the EX_REQUEST data
 * @property {Array.<string>} EX_CHILD - EX_CHILD
 * @property {Array.<string>} IT_REQUESTS - IT_REQUESTS
 * @property {string} IV_RELEASE - IV_RELEASE
 * @returns {object} 200 - An object of checklist
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef Error
 * @property {string} message.required
 */

 /**
* @route POST /sequencePDtransport
* @group Transport Collection - Transport request collection
* @param {sequencePDtransport.model} data.body.required - transport Request
* @returns {sequencePDtransport.model} 200 - An object of transport
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/
/** 
* @typedef sequencePDtransport
* @property {string} trNumber.required - the trNumber data
* @property {string} seqNo.required - the seqNo data
* @returns {object} 200 - An object of transport
* @returns {Error}  default - Unexpected error
*/
/**
 * @typedef Error
 * @property {string} message.required
 */

 
/**
* @route GET /qaTransportList
* @group TR Operations - TR Operations collection
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/

/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */

  
/**
* @route GET /qaOutboundList
* @group TR Operations - TR Operations collection
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/

/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */


 /**
* @route POST /releaseTRBatch
* @group Transport Collection - Transport request collection
* @param {releaseTRBatch.model} data.body.required - transport Request
* @returns {releaseTRBatch.model} 200 - An object of transport
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/
/** 
* @typedef releaseTRBatch
* @property {Array.<string>} transportReqs - the transport data
* @returns {object} 200 - An object of transport
* @returns {Error}  default - Unexpected error
*/
/**
 * @typedef Error
 * @property {string} message.required
 */

/**
* @route POST /trImportStatus
* @group Transport Collection - Transport request collection
* @param {trImportStatus.model} data.body.required - trImportStatus Request
* @returns {object} 200 - An object of User Details
*/
/**
 * @typedef trImportStatus
 * @property {string} transportRequest.required - the crTicketNumber data
 * @property {string} environment - environment
 * @returns {object} 200 - An object of checklist
 * @returns {Error}  default - Unexpected error
 */
/**
 * @typedef Error
 * @property {string} message.required
 */

/**
* @route POST /objectLock
* @group Transport Collection - Transport request collection
* @param {objectLock.model} data.body.required - trImportStatus Request
* @returns {object} 200 - An object of User Details
*/
/**
 * @typedef objectLock
 * @property {string} objectType.required - the objectType data
 * @property {string} keyType.required - keyType
 * @returns {object} 200 - An object of checklist
 * @returns {Error}  default - Unexpected error
 */
/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */
/**
* @route GET /releasedtoPD
* @group Transport Collection - Transport request collection
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/

/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */

 
 /**
* @route GET /gateCheckListAll
* @group checklist Collection - checklist Request collection
* @param {number} crTicketNumber.query.required - crTicketNumber
* @param {string} releaseNumber.query.required - releaseNumber
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/

/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */

 /**
* @route POST /removeObjectLock
* @group Transport Collection - Transport request collection
* @param {removeObjectLock.model} data.body.required - trImportStatus Request
* @returns {object} 200 - An object of User Details
*/
/**
 * @typedef removeObjectLock
 * @property {string} object_id.required - the objectType data
 * @returns {object} 200 - An object of checklist
 * @returns {Error}  default - Unexpected error
 */
/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */

 
 /**
* @route POST /releaseRemarks
* @group Transport Collection - Transport request collection
* @param {releaseRemarks.model} data.body.required - trImportStatus Request
* @returns {object} 200 - An object of User Details
*/
/**
 * @typedef releaseRemarks
 * @property {string} crTicketNumber.required - the crTicketNumber data
 * @property {string} releaseNum.required - the releaseNum data
 * @property {string} remarks.required - the remarks data
 * @returns {object} 200 - An object of checklist
 * @returns {Error}  default - Unexpected error
 */
/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */

 /**
* @route GET /changeRequestDocument
* @group checklist Collection - checklist Request collection
* @param {number} crTicketNumber.query.required - crTicketNumber
* @param {string} releaseNumber.query.required - releaseNumber
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/

/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */

/**
* @route POST /sequenceTransport
* @group Transport Collection - Transport request collection
* @param {sequenceTransport.model} data.body.required - sequenceTransport Request
* @returns {object} 200 - An object of User Details
*/
/**
 * @typedef sequenceTransport
 * @property {string} crTicketNumber.required - the crTicketNumber data
 * @property {string} transportRequest.required - the transportRequest data
 * @property {string} seqNo.required - the seqNo data
*/

/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */

/**
* @route POST /transportTrackLead
* @group Transport Collection - Transport request collection
* @param {Array.<releaseRemarks>} data.body.required - trImportStatus Request
* @returns {object} 200 - An object of User Details
*/
/**
 * @typedef releaseRemarks
 * @property {number} crTicketNumber.required - the crTicketNumber data
 * @property {number} releaseNumber.required - the releaseNumber data
 * @property {boolean} trackApprover.required - the trackApprover data
 * @returns {object} 200 - An object of checklist
 * @returns {Error}  default - Unexpected error
 */
/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */
 /**
* @route GET /transportTrackLead
* @group Transport Collection - Transport request collection
* @param {number} crTicketNumber.query.required - crTicketNumber
* @param {string} releaseNumber.query.required - releaseNumber
* @returns {object} 201 - Created
* @returns {object} 400 - Bad Request
* @returns {object} 401 - Unauthorized
* @returns {object} 404 - No Data Found
* @returns {object} 500 - Internal Server Error
*/

/**
 * @typedef Error
 * @property {string} message.required
 */

/**
 * @typedef object
 * @property {object} data.required
 */