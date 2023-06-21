const config = require('../config/config')
const request = require('request')
const joi = require('joi')

function extractCookie(headers) {
  var cookies = {}
  if (!_.isEmpty(headers.cookie)) {
    headers.cookie.split(';').forEach(function (cookie) {
      var parts = cookie.match(/(.*?)=(.*)$/)
      cookies[parts[1].trim()] = (parts[2] || '').trim()
    })
  }
  return cookies
}

function kibanaLog(filterData) {

  let kibanaPayload = {
    'FILTER': filterData.FILTER,
    'step': filterData.step,
    'apiInput': filterData.apiInput,
    'function': filterData.function,
    'status': filterData.status,
    'dbQuery': filterData.dbQuery,
    'message': filterData.message,
    'headers': filterData.headers,
    'apiOutput': filterData.apiOutput,
    'hostName': filterData.hostName
  }
  let url = config.url.kibanaUrl
  request({
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    uri: url,
    body: JSON.stringify(kibanaPayload)
  }, (error, response, body) => {
    if (error) {
      console.error('kibana api error', error)
    }
    console.log('kibana body', body)
    if (body.status === false) {
      console.log('KIBANA body', 'ok')
    }
  })
}
function postServiceCall(method, url, payload, cookie) {
  // console.log("get det2")
  let header = ''
  if (cookie) {
    header = {
      Cookie: cookie,
      'content-type': 'application/json'
    }
  } else {
    header = {
      'content-type': 'application/json'
    }
  }
  const deferred = q.defer()
  const options = {
    method: method,
    url: url,
    strictSSL: false,
    headers: header,
    body: payload,
    json: true

  }
  console.log(JSON.stringify(payload));
  // console.log(options);
  request(options, function (error, response, body) {
    if (error) {
      return deferred.reject(error)
    } else {
      if (body == undefined) {
        deferred.resolve({ body: null, statusCode: 500, message: null })
      }
      else if (response.statusCode == 204) {
        deferred.resolve({ body: body, statusCode: response.statusCode, message: "No data found" })
      } else {
        deferred.resolve({ body: body, statusCode: response.statusCode, message: body.message ? body.message : null })
      }
    }
  })
  return deferred.promise
}

// Validation Function To Validate User Input Details
function validationChecker(validateSchema, bodyData) {
  const { error } = validateSchema.validate(bodyData);
  if (error) {
    return { error: error.message, flag: false };
  } else {
    return { flag: true };
  }
}
module.exports.extractCookie = extractCookie
module.exports.kibanaLog = kibanaLog
module.exports.validationChecker = validationChecker
module.exports.postServiceCall = postServiceCall