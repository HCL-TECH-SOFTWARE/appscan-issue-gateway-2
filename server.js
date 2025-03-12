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

const https = require('https');
const app = require('./app');
const fs = require('fs');
require('dotenv').config()
const log4js = require('log4js');
const logger = log4js.getLogger("server");
const constants = require('./src/utils/constants');
const igwController = require('./src/igw/controllers/igwController');
const imConfigService = require('./src/igw/services/imConfigService')

const secure_options = {
  pfx: fs.readFileSync(process.env.SSL_PFX_CERT_FILE),
  passphrase: process.env.SSL_PFX_CERT_PASSPHRASE
};

startServer();

function startServer() {
  const SECURE_PORT = process.env.SECURE_PORT || 8443;
  let secureserver;

  try {
    secureserver = https.createServer(secure_options, app);
    logger.log('Secure server created successfully');
  } catch (error) {
    logger.error('Error creating secure server:', error);
    return; // Exit the function if server creation fails
  }

  secureserver.listen(SECURE_PORT, async () => {
    logger.log(`Secure server listening on port ${SECURE_PORT}`);
    let imConfig = null;

    if (typeof process.env.IM_PROVIDER !== 'undefined' && typeof process.env.IMPORT_ISSUES_TO_IM_SYNC_INTERVAL !== 'undefined') {
      imConfig = await igwController.getIMConfig(process.env.IM_PROVIDER);
      igwController.startSync(process.env.IM_PROVIDER, process.env.IMPORT_ISSUES_TO_IM_SYNC_INTERVAL);
    }
    if (process.env.IM_TO_APPSCAN_STATUS_SYNC_INTERVAL !== '0m' && process.env.IM_TO_APPSCAN_STATUS_SYNC_INTERVAL !== '0' && imConfig && imConfig.hasOwnProperty('jiraToAppScanStatusMapping')) {
      igwController.startProviderSync(process.env.IM_PROVIDER, process.env.IM_TO_APPSCAN_STATUS_SYNC_INTERVAL);
    }
    if (process.env.APPSCAN_TO_IM_STATUS_SYNC_INTERVAL !== '0m' && process.env.APPSCAN_TO_IM_STATUS_SYNC_INTERVAL !== '0' && imConfig && imConfig.hasOwnProperty('appScanToJiraStatusMapping')) {
      igwController.startStatusSync(process.env.IM_PROVIDER, process.env.APPSCAN_TO_IM_STATUS_SYNC_INTERVAL);
    }
  });

  secureserver.timeout = 18000000;
  logger.info(constants.START_SERVER_MSG);
}

