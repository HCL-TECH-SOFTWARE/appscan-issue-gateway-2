/*
 *
 * Copyright 2025 HCL America, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * /
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const log4js = require('log4js');
const logger = log4js.getLogger("app");
require('dotenv').config();
var os = require("os");
var hostname = os.hostname();
const constants = require('./src/utils/constants');
var app = express();
global.approot = path.resolve(__dirname);


var maxLogSize = parseInt(process.env.MAXLOGSIZE);

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: process.env.APP_LOG, "maxLogSize": maxLogSize, "numBackups": process.env.NUMBER_OF_BACKUPS }
  },
  categories: {
    default: { appenders: [constants.LOG_APPENDER1, constants.LOG_APPENDER2], level: constants.LOG_LEVEL }
  }
});

app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth-token, responseType");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    return res.status(200).json({});
  }

  res.header('Content-Security-Policy', "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routers for ase
// app.use('/ase/api/user', require('./src/ase/routes/user'));
// app.use('/ase/api/usertype', require('./src/ase/routes/usertype'));
// app.use('/ase/api/auth', require('./src/ase/routes/auth'));
// app.use('/ase/api/job', require('./src/ase/routes/job'));
// app.use('/ase/api/issue', require('./src/ase/routes/issue'));
// app.use('/ase/api/application', require('./src/ase/routes/application'));
app.use('/api/igw', require('./src/igw/routes/igw'));
require('./src/utils/swagger')(app);

logger.info(constants.SWAGGER_PAGE_URL + ` https://` + hostname + `:` + process.env.SECURE_PORT + constants.SWAGGER_CONTEXT_URL);
module.exports = app;
