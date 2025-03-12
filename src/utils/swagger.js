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

/*
Swagger Documentation
*/
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config()
var os = require("os");
var hostname = os.hostname();
const constants = require('./constants');

module.exports = function (app) {
	const options = {
		swaggerDefinition: {
			openapi: '3.0.0',
			basePath: constants.CONTEXT_API,
			info: {
				title: constants.ASE_API_GATEWAY,
				version: constants.SWAGGER_VERSION,
				description: constants.ASE_API_GATEWAY
			},
			servers: [
				{
					url: "https://" + hostname + ":" + process.env.SECURE_PORT + constants.CONTEXT_URL
				}
			]
		},
		apis: ["./src/igw/routes/*.js"]
	};

	const swaggerSpec = swaggerJsdoc(options);
	app.use(constants.SWAGGER_CONTEXT_URL, swaggerUi.serve, swaggerUi.setup(swaggerSpec, false, { docExpansion: "none" }));
}
