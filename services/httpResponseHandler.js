function httpResponseSuccessHandler(res, code, msg, data) {
  res.status(code).send({
    message: msg,
    result: data
    
  })
}
function httpResponseHandlerError(res, errorcode, errormsg) {
  res.status(errorcode).send({
    message: errormsg
  })
}

module.exports.httpResponseHandlerError = httpResponseHandlerError
module.exports.httpResponseSuccessHandler = httpResponseSuccessHandler

