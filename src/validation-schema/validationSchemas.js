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

const { param, body } = require("express-validator");
const constants = require("../utils/constants");

var schemas = {};

schemas.adminEmail = body('adminEmail').isEmail().withMessage(constants.INVALID_ADMIN_EMAIL);
schemas.adminPassword = body('adminPassword').isLength({ min: 8, max: 100 }).withMessage(constants.INVALID_ADMIN_PASSWORD);
schemas.igwLogin = [schemas.adminEmail, schemas.adminPassword];
schemas.providerid = param("providerid").isIn(constants.PROVIDERS).withMessage(constants.INVALID_PROVIDER_ID);;
schemas.syncinterval = param("syncinterval").isInt().isLength({ min: 1, max: 3 }).withMessage(constants.INVALID_SYNC_INTERVAL);
schemas.syncIMInterval = param("syncinterval").isString().isLength({ min: 1, max: 4 }).withMessage(constants.INVALID_SYNC_INTERVAL);
schemas.appId = process.env.APPSCAN_PROVIDER == 'ASE' ? param("appid").isInt().isLength({ min: 1, max: 6 }).withMessage(constants.INVALID_APP_ID) : param("appid").isString().isLength({ min: 36, max: 36 }).withMessage(constants.INVALID_APP_ID);
schemas.jobId = process.env.APPSCAN_PROVIDER == 'ASE' ? param("jobid").isInt().isLength({ min: 1, max: 6 }).withMessage(constants.INVALID_JOB_ID) : param("jobid").isString().isLength({ min: 36, max: 36 }).withMessage(constants.INVALID_JOB_ID);

schemas.maxissues = body('maxissues').isInt().isLength({ min: 1, max: 5 }).withMessage(constants.INVALID_MAX_ISSUES_VALUE);
schemas.issuestates = body('issuestates').isString().isLength({ min: 2, max: 200 }).withMessage(constants.INVALID_ISSUE_STATES);
schemas.issueseverities = body('issueseverities').isString().isLength({ min: 2, max: 200 }).withMessage(constants.INVALID_ISSUE_SEVERITIES);
schemas.imurl = body('imurl').isString().isLength({ min: 2, max: 200 }).withMessage(constants.INVALID_IM_URL);
schemas.imUserName = body('imUserName').isString().isLength({ min: 2, max: 50 }).withMessage(constants.INVALID_IM_USERNAME);
schemas.imPassword = process.env.APPSCAN_PROVIDER == 'ASE' ? body('imPassword').isString().isLength({ min: 2, max: 100 }).withMessage(constants.INVALID_IM_PASSWORD) : body('imPassword').isString().isLength({ min: 2, max: 200 }).withMessage(constants.INVALID_IM_PASSWORD);
schemas.improjectkey = body('improjectkey').isString().isLength({ min: 2, max: 30 }).withMessage(constants.INVALID_PROJECT_KEY);
schemas.imissuetype = body('imissuetype').isString().isLength({ min: 2, max: 20 }).withMessage(constants.INVALID_IM_ISSUE_TYPE);
schemas.imSummary = body('imSummary').isString().isLength({ min: 2, max: 500 }).withMessage(constants.INVALID_IM_SUMMARY);


schemas.imConfig = [schemas.providerid, schemas.maxissues, schemas.issuestates, schemas.issueseverities,
schemas.imurl, schemas.imUserName, schemas.imPassword, schemas.improjectkey, schemas.imissuetype, schemas.imSummary];
module.exports = schemas;
