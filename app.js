const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const config = require('./config/config');
const frameguard = require('frameguard');
// const requestI = require("express-request-id")();
const app = express();
// const commonMethod = require('./controller/commons/commonMethods');
// const checkListRouter = require('./routes/checkListRouter');

// view engine setup
// app.engine('pug', require('pug').__express)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');


app.use(function (req, res, next) {
  req.headers.origin = req.headers.origin || req.headers.host;
  next();
})


global.secretkey = '123456$#@$^@1ERF'
global.cryptoJs = require('crypto-js')

/**
 *  cors options
 */
let whitelist = config.cors.whitelist;
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  preflightContinue: false,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Total-Count', 'x-access-token', 'Content-Range', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Origin'],
}

global.secretkey = '123456$#@$^@1ERF'
global.cryptoJs = require('crypto-js')


const mongoDb = require('./utils/database/mongoDb');
global.connection = mongoDb.mongoPool();
const expressSwagger = require('express-swagger-generator')(app);

let options = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Swagger',
      version: '1.0.0',
    },
    host: config.envUrl,
    basePath: config.app.prefix,
    produces: [
      "application/json",
      "application/xml"
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "",

      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./swagger/swagger.js'] //Path to the API handle folder
};
expressSwagger(options)

app.use(frameguard({
  action: 'DENY'
}));

// app.use(express.json());
// app.use(express.urlencoded({
//   extended: false
// }));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieParser());
// app.use(function middleware(req, res, next) {
//   commonMethod.logRequestToAPM(req, res, next);
// });
// app.use(cors());

/**
 *  cors options
 */

app.use('/', cors(corsOptions), indexRouter);

global.q = require('q')
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(err.Error);
});

if (process.env.NODE_ENV == 'qa' || process.env.NODE_ENV == 'prod') {
  process.env.NODE_ENV = "production";
  console.log('process.env.NODE_ENV   => ', process.env.NODE_ENV)
}
/* SERVER START */
let port = process.env.PORT || config.server.port
let server = app.listen(port)
server.timeout = 600000

console.log('Api is running on port', port)

module.exports = app;