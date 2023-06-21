
const uniqId = new Date().valueOf();
const postServiceCall = require('../services/common').postServiceCall;
let config = require('../config/config')
async function validateCookie(req, res, next) {
    try {
        let { cookie } = req.headers
        let payload = {}
        let userData = await postServiceCall('POST', config.url.checkCookies, payload, cookie)

        if (userData.statusCode == 200 && userData.message === "Success" && _.has(userData.body, "result")) {
            let uniqueNo = `${config.moduleCode}${uniqId}`
            req.info = userData.body.result
            req.info.uniqueNo = uniqueNo
            return true
            //return httpResponseHandlerError(res, msgCodeJson.ERR003.code, "Invalid Cookies");
        }
        return httpResponseHandlerError(res, msgCodeJson.ERR003.code, "Invalid Cookies");
    } catch (error) {
        return httpResponseHandlerError(res, msgCodeJson.ERR003.code, "Invalid Cookies");
    }
}
module.exports.validateCookie = validateCookie