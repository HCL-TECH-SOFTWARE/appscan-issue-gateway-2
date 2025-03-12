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

const util = require("../../utils/util");
const constants = require("../../utils/constants");

var methods = {};

methods.keyLogin = async (inputData) => {
    const url = constants.ASE_API_KEYLOGIN;
    return await util.httpCall("POST", "", url, JSON.stringify(inputData));
};

module.exports = methods;