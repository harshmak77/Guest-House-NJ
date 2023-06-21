'use strict';
const request = require('request');
const q = require('q');
const _ = require('underscore');

function sendRequest(options) {
    let deferred = q.defer();
    try {
        request(options, function (error, response, body) {
            if (error) {
                console.log('getAuthentication call error', error.message);
                deferred.reject(error.message);
            } else {
                try {
                    if (response.statusCode === 201 || response.statusCode === 200) {
                        deferred.resolve(body);
                    } else {
                        deferred.reject({
                            message: 'Failed to Process HTTP Request'
                        })
                    }
                } catch (error) {
                    deferred.reject(error);
                }
            }
        });
    } catch (error) {
        deferred.reject(error);
    }
    return deferred.promise;
}

function createOption(uri, method, requestBody, cookie) {
    let deferred = q.defer();
    try {
        const options = {
            method: method,
            url: uri,
            headers: {
                'Cookie': `${cookie}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            strictSSL: false,
            // body: requestBody,
            json: true
        };
        if (requestBody && !_.isEmpty(requestBody)) {
            Object.assign(options, {
                body: requestBody
            });
        }
        deferred.resolve(options);
    } catch (error) {
        console.log(error);
        deferred.reject(error);
    }
    return deferred.promise;
}

module.exports.createOption = createOption;
module.exports.sendRequest = sendRequest;