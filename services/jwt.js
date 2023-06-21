let cryptoJs = require('crypto-js')
let secret = 'jioface@ktbIjt(F;0*JfR^R1)5u@';
let jwt = require('jsonwebtoken')
const config = require('../config/config')
let { postServiceCall } = require('../services/common')
class jwtToken {
    static async generateToken(data, flag = false) {
        try {
            let url = config.url.generateToken
            let payload = {
                data: data,
                flag: flag
            }
            let token = await postServiceCall('POST', url, payload)
            console.log(token)
            if (token.body.token) {
                return token.body.token
            }
        } catch (error) {
            return error
        }
    }
    static async verifyToken(token) {
        let decodedToken = await JWT.verify(token, secret);
        return decodedToken
    }

}
module.exports.jwtToken = jwtToken