/**
 * function is for calling service api to fetch Data From Mongo DB
 * creating unqid and datetime to add into logger
 */
const config = require('../config/config')
const { postServiceCall } = require('../services/common')

function getMongoData(payload) {
    const deferred = q.defer()
    const url = config.url.getMongoData
    postServiceCall('POST', url, payload)
        .then((result) => {
            deferred.resolve(result.body)
        })
        .catch((error) => {
            deferred.reject({ message: error, code: 400 })
        })
    return deferred.promise
}

module.exports.getMongoData = getMongoData
