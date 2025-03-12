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

const jsonwebtoken = require("../utils/jsonwebtoken");
const constants = require("../utils/constants");
const log4js = require("log4js");
const logger = log4js.getLogger("tokenValidation");

var methods = {};

methods.validateToken = (req, res, next) => {

    const token = jsonwebtoken.getTokenData(req);

    if (token == null || token.length === 0) {
        logger.error(constants.TOKEN_ABSENT);
        return res.status(401).json({ message: constants.TOKEN_ABSENT });
    }
    req.token = token;
    next();
}

module.exports = methods;