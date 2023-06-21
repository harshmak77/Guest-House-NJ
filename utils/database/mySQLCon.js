let mysql = require('mysql')
let config = require('../../config/config')
let util = require('util')

let connection = mysql.createPool({
  connectionLimit: 200,
  connectTimeout: 5 * 60 * 1000,
  acquireTimeout: 5 * 60 * 1000,
  timeout: 5 * 60 * 1000,
  host: config.sql_db.host,
  user: config.sql_db.user,
  password: config.sql_db.password,
  database: config.sql_db.database,
  timezone: 'UTC+05:30',
  multipleStatements: true
})

connection.getConnection((err, connect) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
    if (err.code === 'ERR_STREAM_DESTROYED') {
      console.error('Cannot call write after a stream was destroyed')
    }
  }
  if (connect) {
    connect.release();
  }
})
connection.query = util.promisify(connection.query);

module.exports.connection = connection