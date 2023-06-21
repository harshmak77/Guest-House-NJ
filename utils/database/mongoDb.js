'use strict';
let mongoose = require('mongoose');
let config = require('../../config/config');
let q = require('q');

function mongoPool() {
  let deferred = q.defer();
  try {
    let strConnection = config.mongoDb.dbConnectionString
    // console.log('strConnection: ', strConnection);

    const options = {
      poolSize: config.mongoDb.connectionPool, // Maintain up to 10 socket connections
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      auto_reconnect: true,
      useFindAndModify: false,
      autoIndex: false, // Don't build indexes
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      connectTimeoutMS: 50000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    };

    mongoose.connect(strConnection, options)
      .then(connection => {
        console.log("Mongo Connected");
        deferred.resolve(connection)
      }).catch((error) => {
        deferred.reject(error)
      });
  } catch (error) {
    deferred.reject(error)
  }
  return deferred.promise;
}

function closeMongoCon() {
  mongoose.connection.close();
}

function release(schemaName) {
  try {
    delete mongoose.models[schemaName.modelName];
    delete mongoose.connection.collections[schemaName.modelName];
    delete mongoose.modelSchemas[schemaName.modelName];
    return 'success';
  } catch (error) {
    return error;
  }
}

module.exports.mongoPool = mongoPool;
module.exports.closeMongoCon = closeMongoCon;
module.exports.release = release;