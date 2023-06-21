'use strict';
const mongoDb = require('../../../utils/database/mongoDb');
const mongoose = require('mongoose');
mongoose.pluralize(null);
const q = require('q');
const errorCodeJson = require('../../../utils/errorHandling/errorCode');

function callAggregation(schemaName, searchParams) {
    let deferred = q.defer();
    try {
        schemaName.aggregate(searchParams, function (error, queryResults) {
            console.log(searchParams);
            mongoDb.release(schemaName);
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(queryResults)
            }
        });
    } catch (error) {
        console.log(error)
        deferred.reject(error);
    }
    return deferred.promise;
}

function updateData(schemaName, searchParams, updateParams) {
    let deferred = q.defer();
    try{
        schemaName.findOneAndUpdate(searchParams,
            updateParams, {
                "upsert": false,
                "new": true
            },
            function (error, dbresponse) {
                mongoDb.release(schemaName);
                if (error) {
                    deferred.reject(errorCodeJson.ERROR_GENERIC_ERROR_MGS.msg);
                } else if (dbresponse == null) {
                    deferred.reject(errorCodeJson.ERROR_MSG_CR_UPDATED.msg);
                } else {
                    deferred.resolve(dbresponse);
                }
            });
    } catch (error) {
        console.log(error)
        deferred.reject(error);
    }
    return deferred.promise;
    

}


module.exports.callAggregation = callAggregation;
module.exports.updateData = updateData;