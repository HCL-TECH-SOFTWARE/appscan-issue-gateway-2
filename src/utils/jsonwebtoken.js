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

const jwt = require('jsonwebtoken');
const log4js = require("log4js");
const logger = log4js.getLogger("jsonwebtoken");
const constants = require('./constants');
const jwtExpirySeconds = constants.TOKEN_EXPIRY_TIME;
const jwtSecretkey = constants.JWT_SECRET_KEY;

var methods = {};
methods.getTokenData = function (req) {
    var payload = '';
    var verifiedPayload = null;
    const bearerHeader = req.headers[constants.AUTH_TOKEN];

    if ((typeof bearerHeader !== 'undefined') && bearerHeader.length > 0) {
        const bearer = bearerHeader.split(' ');
        payload = bearer[1] != undefined ? bearer[1] : bearer[0];
    }
    else if (req.session && req.session.token)
        payload = req.session.token;

    try {
        verifiedPayload = jwt.verify(payload, jwtSecretkey);
        return verifiedPayload.data;
    }
    catch (err) {
        logger.error(constants.TOKEN_ABSENT);
        return null;
    }
}

methods.verifyToken = function (req) {
    var token = this.getTokenData(req);
    return (token.length > 0) ? true : false;
}

//Create JWT token for login.
methods.createToken = function (data) {
    return jwt.sign({ data }, jwtSecretkey, {
        expiresIn: jwtExpirySeconds
    });
};

methods.createNoExpiryToken = function (data) {
    return jwt.sign({ data }, jwtSecretkey, {});
};
module.exports = methods;