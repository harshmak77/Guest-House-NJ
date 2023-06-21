'use strict';
var connectionPool = require('../../utils/database/mySQLCon').connection;
const _ = require('underscore');
const q = require('q');
const cookieAuth = require('../authorization/authorization');
// const apmInput = require('../../elastic-apm-node');
// const apm = require('elastic-apm-node').start(apmInput);
const errorHandler = require('../../utils/errorHandling/errorHandler');
const errorCodeJson = require('../../utils/errorHandling/errorCode');
const config = require('../../config/config');

function getCurrentDateTime() {
  try {
    let objDate = new Date();
    let timestamp = objDate.getTime();
    let dateTimeStamp = new Date(timestamp);
    // console.log('dateTimeStamp -----------------------> ', dateTimeStamp)
    return dateTimeStamp
  } catch (error) {
    // console.error('operation failed1: ', error);
  }
}

function getCurrentTimeStamp() {
  try {
    let date = new Date();
    let timestamp = date.getTime();
    let d = new Date(timestamp);
    // console.log('d -----------------------> ', d)
    let strDate = formatDate(d)
    // console.log(strDate);
    return strDate;
  } catch (error) {
    // console.error('operation failed1: ', error);
  }
}

function formatDate(dateVal) {
  let newDate = new Date(dateVal);

  let sMonth = padValue(newDate.getMonth() + 1);
  let sDay = padValue(newDate.getDate());
  let sYear = newDate.getFullYear();
  let sHour = newDate.getHours();
  let sMinute = padValue(newDate.getMinutes());
  let sSeconds = padValue(newDate.getSeconds());
  // console.log(sMonth + "-" + sDay + "-" + sYear + " " + sHour + ":" + sMinute + ":" + sSeconds)

  return sMonth + "-" + sDay + "-" + sYear + " " + sHour + ":" + sMinute + ":" + sSeconds
}

function padValue(value) {
  return (value < 10) ? "0" + value : value;
}

function getCurrentDate() {
  try {
    let date = new Date();
    let timestamp = date.getTime();
    let d = new Date(timestamp);
    let strDate = formatDateMMDDYYYY(d);
    return strDate;
  } catch (error) {
    console.error('operation failed1: ', error);
  }
}

function getCurrentTime() {
  try {
    let date = new Date();
    let timestamp = date.getTime();
    let d = new Date(timestamp);
    let strDate = formatTimeAM_PM(d);
    return strDate;
  } catch (error) {
    console.error('operation failed1: ', error);
  }

}


function getEncryptKey(value) {
  let secreKey = cryptoJs.enc.Utf8.parse(secretkey)
  let iv = cryptoJs.enc.Utf8.parse(secretkey)
  let encrypted = cryptoJs.AES.encrypt(cryptoJs.enc.Utf8.parse(value.toString()), secreKey, {
    keySize: 128 / 8,
    iv: iv,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.Pkcs7
  })

  return encrypted.toString()
}


function getDecryptKey(value) {
  let secreKey = cryptoJs.enc.Utf8.parse(secretkey)
  let iv = cryptoJs.enc.Utf8.parse(secretkey)
  let decrypted = cryptoJs.AES.decrypt(value, secreKey, {
    keySize: 128 / 8,
    iv: iv,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.Pkcs7
  })
  return decrypted.toString(cryptoJs.enc.Utf8)
}


function setSLAclosingDate(createdtDate, slaendDate) {
  if (this.getWeekoffDatesCount(createdtDate, slaendDate) > 0)
    slaendDate.setDate(slaendDate.getDate() + 2);
  return slaendDate;

}

function getWeekoffDatesCount(ticketCreatedDate) {
  try {
    ticketCreatedDate = new Date(ticketCreatedDate);
    let dayOfWeek = ticketCreatedDate.getDay();
    if (dayOfWeek == 6 || dayOfWeek == 0) {
      return ticketCreatedDate.setDate(ticketCreatedDate.getDate() + 2)
    } else {
      return ticketCreatedDate;
    }
    // else if (dayOfWeek == 0) {
    //   return ticketCreatedDate.setDate(ticketCreatedDate.getDate() + 2)
    // } 
  } catch (error) {
    throw new Error(error);
  }
}

async function calculateSLAExpiryDate(createdDatetemp, priority) {
  try {
    let ticketCreatedDate = new Date(createdDatetemp);
    switch (priority) {
      case '01':
        return await getWeekoffDatesCount(ticketCreatedDate.setDate(ticketCreatedDate.getDate() + 1));
      case '02':
        return await getWeekoffDatesCount(ticketCreatedDate.setDate(ticketCreatedDate.getDate() + 2));
      case '03':
        return await getWeekoffDatesCount(ticketCreatedDate.setDate(ticketCreatedDate.getDate() + 3));
      default:
        return await getWeekoffDatesCount(ticketCreatedDate.setDate(ticketCreatedDate.getDate() + 4));
    }
  } catch (error) {
    throw new Error(error);
  }
}

// async function recalculateSLAExpiryDate(ticketCreatedDate, priority) {
//   var tomorrow = new Date(ticketCreatedDate);
//   let newSLADate;
//   switch (priority) {
//       case '01':
//           newSLADate = tomorrow.setDate(tomorrow.getDate() + 1);
//           break;
//       case '02':
//           newSLADate = tomorrow.setDate(tomorrow.getDate() + 2);
//           break;
//       case '03':
//           newSLADate = tomorrow.setDate(tomorrow.getDate() + 3);
//           break;
//       default:
//           newSLADate = tomorrow.setDate(tomorrow.getDate() + 4);
//           break;
//   }
//   return newSLADate;
// }

function processToken(token) {
  let deferred = q.defer();
  // console.log('Inside Process Token function')
  if (!_.isEmpty(token.decryptedCookie)) {
    deferred.resolve({
      document: token.decryptedCookie,
      messageObj: {
        message: "Token Fetched"
      }
    });
  } else {
    deferred.reject({
      errorText: 'No Data Found'
    });
  }
  return deferred.promise

}

function executeSelectQuery(query) {
  let deferred = q.defer();
  try {
    let selectQuery = query;
    connectionPool.getConnection((error, connection) => {
      if (error) {
        deferred.reject(error)
      } else {
        connection.query(selectQuery, function (error, rows) {
          connection.destroy();
          if (error) {
            console.log("error", error);
            deferred.reject(error)
          } else {
            deferred.resolve(rows)
          }
        })
      }
    })
  } catch (error) {
    deferred.reject(error)
  }
  return deferred.promise;
}



function executeUpdateQuery(updateQuery, updateArray) {
  let deferred = q.defer();
  try {
    connectionPool.getConnection((error, connection) => {
      if (error) {
        deferred.reject(error)
      } else {
        connection.query(updateQuery, updateArray, function (error, rows) {
          connection.destroy();
          if (error) {
            console.log("error", error);
            deferred.reject(error)
          } else {
            deferred.resolve(rows)
          }
        })
      }
    })
  } catch (error) {
    deferred.reject(error)
  }
  return deferred.promise;
}

function logRequestToAPM(req, res, next) {
  try {
    cookieAuth.getDomainID(req)
      .then(result => {
        req.body.domainId = result.domainID
        req.userInformation = result
        apm.setUserContext({
          id: result.domainID,
          username: result.fullName,
          email: result.emailID
        })
        return next();
      }).catch(async (error) => {
        console.log('logRequestToAPM ', error)
        checkRequestOrigion(req, next)
          .then(response => {
            if (response == 'success') {
              return next()
            } else {
              return errorHandler.errorHandler({
                errorCode: 401,
                error: error
              }, res, errorCodeJson.ERROR_GENERIC_ERROR_MGS.msg);
            }
          }).catch(error => {
            return errorHandler.errorHandler({
              errorCode: 401,
              error: error
            }, res, errorCodeJson.ERROR_GENERIC_ERROR_MGS.msg);
          });
      })
  } catch (error) {
    return errorHandler.errorHandler({
      errorCode: 400,
      error: error
    }, res, errorCodeJson.ERROR_GENERIC_ERROR_MGS.msg);
  }

}

function checkRequestOrigion(req, next) {
  let promiseQ = q.defer();
  try {
    let origin = req.headers.origin || req.headers.host;
    let originalUrl = req.originalUrl;
    let originConfig = config.utils.exceptionCookie.origin;
    let originalUrlConfig = config.utils.exceptionCookie.route;

    if ((originConfig.indexOf(origin) === -1) || (originalUrl.indexOf(originalUrlConfig) === -1)) {
      promiseQ.reject(errorCodeJson.ERROR_MSG_UNAUTHORISED_ACCESS.msg);
    } else {
      promiseQ.resolve('success');
    }
  } catch (error) {
    console.log(error);
    promiseQ.reject(error)
  }
  return promiseQ.promise;


}

function formatDateMMDDYYYY(dateVal) {
  try {
    let newDate = new Date(dateVal);

    let sMonth = padValue(newDate.getMonth() + 1);
    let sDay = padValue(newDate.getDate());
    let sYear = newDate.getFullYear();
    return sDay + "-" + sMonth + "-" + sYear;
  } catch (error) {
    throw new Error(error);
  }
}

function formatTimeAM_PM(dateVal) {
  try {
    let newDate = new Date(dateVal);
    let sHour = padValue(newDate.getHours());
    let sMinute = padValue(newDate.getMinutes());
    let sSeconds = padValue(newDate.getSeconds());
    return sHour + ":" + sMinute;
  } catch (error) {
    throw new Error(error);
  }
}

function consoleLogger(logText) {
  let logTime = getCurrentTimeStamp()
  console.log(`log-${logTime}:  `, logText);
}

module.exports.getDecryptKey = getDecryptKey;
module.exports.getEncryptKey = getEncryptKey;
module.exports.getCurrentTimeStamp = getCurrentTimeStamp;
module.exports.getCurrentDateTime = getCurrentDateTime;
module.exports.processToken = processToken;
module.exports.calculateSLAExpiryDate = calculateSLAExpiryDate;
module.exports.executeSelectQuery = executeSelectQuery;
module.exports.executeUpdateQuery = executeUpdateQuery;
module.exports.logRequestToAPM = logRequestToAPM;
module.exports.formatDateMMDDYYYY = formatDateMMDDYYYY;
module.exports.consoleLogger = consoleLogger;
module.exports.getCurrentDate = getCurrentDate;
module.exports.getCurrentTime = getCurrentTime;