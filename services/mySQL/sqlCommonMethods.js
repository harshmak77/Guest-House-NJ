'use strict';
var connectionPool = require('../../utils/database/mySQLCon').connection;
const _ = require('underscore');
const q = require('q');

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

function executeSelectQueryWithParam(connectionPool, query, params) {
    let deferred = q.defer();
    try {
        connectionPool.getConnection((error, connection) => {
            if (error) {
                deferred.reject(errorCodeJson.ERROR_MSG_SQL_CONNECTION_FAILED.msg)
            } else {
                connection.query(query, params, function (error, rows) {
                    connection.destroy();
                    if (error) {
                        console.log(error);
                        deferred.reject(errorCodeJson.ERROR_MSG_SQL_INVALID_INPUT.msg)
                    } else {
                        deferred.resolve(rows)
                    }
                })
            }
        })
    } catch (error) {
        console.log(error);
        deferred.reject(errorCodeJson.ERROR_MSG_SQL_INVALID_INPUT.msg)
    }
    return deferred.promise;
}

module.exports.executeSelectQuery = executeSelectQuery;
module.exports.executeSelectQueryWithParam = executeSelectQueryWithParam;