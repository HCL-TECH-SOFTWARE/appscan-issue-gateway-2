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
const log4js = require("log4js");
const logger = log4js.getLogger("jiraService");
const FormData = require("form-data");
const cryptoService = require("../../../cryptoService");
var methods = {};
const asocAuthService = require('../../asoc/service/authService');
const decodeHtml = require('../../utils/decodeHtml');

methods.jiraValidateToken = async (token) => {
    const url = constants.JIRA_PING_API;
    const imConfig = getConfig("GET", token, url, undefined);
    return await util.httpImCall(imConfig);
};

methods.createTickets = async (issues, imConfigObject, applicationId, applicationName) => {
    var output = {};
    var success = [];
    var failures = [];
    for (var i = 0; i < issues.length; i++) {
        if (process.env.APPSCAN_PROVIDER == "ASE") {
            issues[i].ApplicationId = applicationId;
        }
        issues[i].ApplicationName = applicationName;
        const imPayload = await createPayload(issues[i], imConfigObject, applicationId, applicationName);
        try {
            var basicToken = "Basic " + btoa(imConfigObject.imUserName + ":" + imConfigObject.imPassword);
            const imConfig = getConfig("POST", basicToken, imConfigObject.imurl + constants.JIRA_CREATE_TICKET, imPayload);
            const result = await util.httpImCall(imConfig);
            await delay(3000);
            if (result.code === 201) {
                const imTicket = imConfigObject.imurl + "/browse/" + result.data.key;
                // //if the issue is status is Noise then update the status of corresponding Jira ticket to False Positive
                // if (issues[i].Status === "Noise") {
                //     const transitionData = {
                //         "transition": {
                //             "id": `${imConfigObject.jiraStatusIdMapping["False Positive"]}`
                //         }
                //     }
                //     await methods.updateImStatus(imConfigObject, transitionData, result.data.key);
                //     //This global set is used to keep track of the issues that are already transitioned so that we don't transition them again in the status sync job
                //     alreadyTransitionedIssues.add(issues[i].id);
                // }

                //create Jira issue property to indentify the issues created by AppScan
                await methods.createJiraIssueProperty(imConfigObject, result.data.key);
                process.env.APPSCAN_PROVIDER == "ASE" ? success.push({ issueId: issues[i]["id"], ticket: imTicket }) : success.push({ issueId: issues[i]["Id"], ticket: imTicket });
            }
            else {
                process.env.APPSCAN_PROVIDER == "ASE" ? failures.push({ issueId: issues[i]["id"], errorCode: result.code, errorMsg: result.data }) : failures.push({ issueId: issues[i]["Id"], errorCode: result.code, errorMsg: result.data });
                logger.error(`Failed to create ticket for issue Id ${process.env.APPSCAN_PROVIDER == "ASoC" ? issues[i]["Id"] : issues[i]["id"]} and the error is ${JSON.stringify(result.data)}`);
            }
        } catch (error) {
            logger.error(`Failed to create ticket for issue Id ${process.env.APPSCAN_PROVIDER == "ASE" ? issues[i]["id"] : issues[i]["Id"]} and the error is ${JSON.stringify(error.response.data)}`);
            failures.push({ issueId: process.env.APPSCAN_PROVIDER == "ASE" ? issues[i]["id"] : issues[i]["Id"], errorMsg: error.message });
        }
    }
    output["success"] = success;
    output["failure"] = failures;
    return output;
};

methods.updateTickets = async (bodyData, imConfigObject, applicationId, projectKey) => {
    var output = {};
    var success = [];
    var failures = [];
    const imPayload = bodyData;

    try {
        var basicToken = "Basic " + btoa(imConfigObject.imUserName + ":" + imConfigObject.imPassword);
        let imUrl = (imConfigObject.imurl + constants.JIRA_UPDATE_TICKET).replace("{JIRAID}", projectKey)
        const imTicket = imConfigObject.imurl + "/browse/" + projectKey;
        const imConfig = getConfig("PUT", basicToken, imUrl, imPayload);
        const result = await util.httpImCall(imConfig);
        await delay(3000);
        if (result.code === 204) {
            process.env.APPSCAN_PROVIDER == "ASE" ? success.push({ issueId: issues[i]["id"], ticket: imTicket }) : success.push({ ticket: imTicket, bodyData: JSON.stringify(bodyData) });
        }
        else {
            process.env.APPSCAN_PROVIDER == "ASE" ? failures.push({ issueId: issues[i]["id"], errorCode: result.code, errorMsg: result.data }) : failures.push({ ticket: imTicket, errorCode: result.code, errorMsg: result.data });
            logger.error(`Failed to create ticket for Project Key -  ${projectKey} and the error is ${result.data}`);
        }
    } catch (error) {
        logger.error(`Failed to create ticket for Project Key - ${projectKey} and the error is ${JSON.stringify(error.response.data)}`);
        failures.push({ ticket: imTicket, errorMsg: error.message });
    }
    output["success"] = success;
    output["failure"] = failures;
    return output;
};

methods.updateImStatus = async (imConfigObject, bodyData, projectKey) => {
    try {
        let url = constants.JIRA_UPDATE_TRANSITION.replace("{JIRAID}", projectKey);
        var basicToken = "Basic " + btoa(imConfigObject.imUserName + ":" + imConfigObject.imPassword);
        const imConfig = getConfig("POST", basicToken, imConfigObject.imurl + url, bodyData);

        const result = await util.httpImCall(imConfig);
        return result;
    } catch (err) {
        logger.error(`Failed to update ticket for Project Key - ${projectKey} and the error is ${JSON.stringify(error.response.data)}`);
    }
}

methods.createJiraIssueProperty = async (imConfigObject, issue) => {
    try {
        const url = constants.JIRA_ISSUE_PROPERTY.replace("{JIRAID}", issue).replace("{PROPERTY_KEY}", "appscan");
        var basicToken = "Basic " + btoa(imConfigObject.imUserName + ":" + imConfigObject.imPassword);
        const bodyData = { "createdBy": "appScan" };
        const imConfig = getConfig("PUT", basicToken, imConfigObject.imurl + url, bodyData);

        const result = await util.httpImCall(imConfig);
    }
    catch (err) {
        logger.error(`Failed to create issue property for issue Id ${issue} and the error is ${JSON.stringify(err.response.data)}`);
    }
};

methods.getJiraIssueProperty = async (issue, imConfigObject) => {
    try {
        const url = constants.JIRA_ISSUE_PROPERTY.replace("{JIRAID}", issue).replace("{PROPERTY_KEY}", "appscan");
        var basicToken = "Basic " + btoa(imConfigObject.imUserName + ":" + imConfigObject.imPassword);
        const imConfig = getConfig("GET", basicToken, imConfigObject.imurl + url, "");

        const result = await util.httpImCall(imConfig);
        return result;
    }
    catch (err) {
        logger.error(`Failed to get issue property for issue Id ${issue} and the error is ${JSON.stringify(err.response.data)}`);
    }
};

methods.createScanTickets = async (issues, imConfigObject, applicationId, applicationName, scanId, discoveryMethod) => {
    var output = {};
    var success = [];
    var failures = [];
    for (var i = 0; i < issues.length; i++) {
        let improjectscanKey = imConfigObject.improjectscanKey;
        imConfigObject.improjectkey = improjectscanKey;
        issues[i].ApplicationName = applicationName;
        issues[i].ApplicationId = applicationId;
        const imPayload = await createScanPayload(issues[i], imConfigObject, applicationId, applicationName, scanId, discoveryMethod);
        try {
            var basicToken = "Basic " + btoa(imConfigObject.imUserName + ":" + imConfigObject.imPassword);
            const imConfig = getConfig("POST", basicToken, imConfigObject.imurl + constants.JIRA_CREATE_TICKET, imPayload);
            const result = await util.httpImCall(imConfig);
            await delay(3000);
            if (result.code === 201) {
                const imTicket = imConfigObject.imurl + "/browse/" + result.data.key;
                process.env.APPSCAN_PROVIDER == "ASE" ? success.push({ scanId: scanId, ticket: imTicket }) : success.push({ scanId: scanId, ticket: imTicket });
            }
            else {
                process.env.APPSCAN_PROVIDER == "ASE" ? failures.push({ scanId: scanId, errorCode: result.code, errorMsg: result.data }) : failures.push({ scanId: scanId, errorCode: result.code, errorMsg: result.data });
                logger.error(`Failed to create ticket for scan Id ${scanId} and the error is ${JSON.stringify(result.data)}`);
            }
        } catch (error) {
            logger.error(`Failed to create ticket for scan Id ${scanId} and the error is ${JSON.stringify(error.response.data)}`);
            failures.push({ scanId: scanId, errorMsg: error.message });
        }
    }
    output["success"] = success;
    output["failure"] = failures;
    return output;
};

const replacePlaceholders = (template, issue) => {
    return template.replace(/%([^%]+)%/g, (_, key) => {
        const trimmedKey = key.trim();
        const value = issue[trimmedKey];
        if (value) {
            return process.env.APPSCAN_PROVIDER === "ASE" ? decodeHtml(value) : value;
        }
        return `%${key}%`;
    });
};


const createPayload = async (issue, imConfigObject, applicationId, applicationName) => {

    // console.log(issue)

    var payload = {};
    var attrMap = {};
    attrMap["project"] = { "key": imConfigObject.improjectkey[applicationId] == undefined ? imConfigObject.improjectkey['default'] : imConfigObject.improjectkey[applicationId] };
    attrMap["issuetype"] = { "name": imConfigObject.imissuetype };
    attrMap["summary"] = replacePlaceholders(imConfigObject.imSummary, issue);


    attrMap["description"] = JSON.stringify(issue, null, 4);
    const attributeMappings = typeof imConfigObject.attributeMappings != 'undefined' ? imConfigObject.attributeMappings : [];

    for (var i = 0; i < attributeMappings.length; i++) {
        let appScanAttrVal = attributeMappings[i].defaultAttrValue === "" ? issue[attributeMappings[i].appScanAttr] : attributeMappings[i].defaultAttrValue;
        if (attributeMappings[i].type === 'Array') {
            const arrayValues = [];
            attributeMappings[i].appScanAttr.forEach((element) => {
                const item = issue[element] ? issue[element].toString().replace(/\s+/g, '') : element.replace(/\s+/g, ''); // Jira does not accept whitespaces in the array values so removing them                    item.split(/\s+/).join(''); // Jira does not accept whiltespaces in the array values so removing them
                arrayValues.push(item);
            });
            attrMap[attributeMappings[i].imAttrId] = arrayValues
        }
        else if (attributeMappings[i].type === "Dropdown") {
            if (appScanAttrVal) {
                attrMap[attributeMappings[i].imAttrId] = {
                    "value": appScanAttrVal
                }
            }
        }
        else if (attributeMappings[i].type === "DateTime") {
            const formattedDateString = new Date(appScanAttrVal || Date.now()).toISOString().replace("Z", "+0000");
            attrMap[attributeMappings[i].imAttrId] = formattedDateString;
        }
        else if (attributeMappings[i].type === "String") {
            if (appScanAttrVal) {
                attrMap[attributeMappings[i].imAttrId] = String(decodeHtml(appScanAttrVal));
            }
        }
    }
    payload["fields"] = attrMap;

    //Set the priority based on the severity only if the severity is present in the severity map
    if (imConfigObject.severityPriorityMap[issue["Severity"]]) {
        payload["fields"]["priority"] = {
            "name": imConfigObject.severityPriorityMap[issue["Severity"]]
        }
    }
    return payload;

}

const createScanPayload = async (issue, imConfigObject, applicationId, applicationName, scanId, discoveryMethod) => {
    var payload = {};
    var attrMap = {};
    attrMap["project"] = { "key": imConfigObject.improjectkey[applicationId] == undefined ? imConfigObject.improjectkey['default'] : imConfigObject.improjectkey[applicationId] };
    attrMap["issuetype"] = { "name": 'Task' };
    if (process.env.APPSCAN_PROVIDER == "ASoC") {
        attrMap["summary"] = discoveryMethod + ' - ' + applicationName + " - " + scanId + " scanned by ASoC";
    } else if (process.env.APPSCAN_PROVIDER == "A360") {
        attrMap["summary"] = discoveryMethod + ' - ' + applicationName + " - " + scanId + " scanned by A360";
    }
    else {
        attrMap["summary"] = "Security issue: " + scanId + ' ' + discoveryMethod + " found by AppScan";
    }
    attrMap["description"] = JSON.stringify(issue, null, 4);
    const attributeMappings = typeof imConfigObject.attributeMappings != 'undefined' ? imConfigObject.attributeMappings : [];
    let labelName = applicationName.trim();
    labelName = labelName.split(/\s+/).join('_')
    for (var i = 0; i < attributeMappings.length; i++) {
        let appScanAttrVal = attributeMappings[i].defaultAttrValue === "" ? issue[attributeMappings[i].appScanAttr] : attributeMappings[i].defaultAttrValue;
        if (attributeMappings[i].type === 'Array') {
            const arrayValues = [];
            attributeMappings[i].appScanAttr.forEach((element) => {
                const item = issue[element] ? issue[element].toString().replace(/\s+/g, '') : element.replace(/\s+/g, ''); // Jira does not accept whitespaces in the array values so removing them                    item.split(/\s+/).join(''); // Jira does not accept whiltespaces in the array values so removing them
                arrayValues.push(item);
            });
            attrMap[attributeMappings[i].imAttrId] = arrayValues
        }
        else if (attributeMappings[i].type === "Dropdown") {
            if (appScanAttrVal) {
                attrMap[attributeMappings[i].imAttrId] = {
                    "value": appScanAttrVal
                }
            }
        }
        else if (attributeMappings[i].type === "DateTime") {
            const formattedDateString = new Date(appScanAttrVal || Date.now()).toISOString().replace("Z", "+0000");
            attrMap[attributeMappings[i].imAttrId] = formattedDateString;
        }
        else if (attributeMappings[i].type === "String") {
            if (appScanAttrVal) {
                attrMap[attributeMappings[i].imAttrId] = String(appScanAttrVal);
            }
        }
    }
    payload["fields"] = attrMap;
    return payload;
}


methods.attachIssueDataFile = async (ticket, filePath, imConfigObject) => {
    const url = imConfigObject.imurl + constants.JIRA_ATTACH_FILE.replace("{JIRAID}", ticket);
    const formData = new FormData();
    formData.append('file', require("fs").createReadStream(filePath));
    let userData = imConfigObject.imUserName + ":" + imConfigObject.imPassword;
    var basicToken = `Basic ${Buffer.from(userData).toString('base64')}`;
    const imConfig = getConfig("POST", basicToken, url, formData);
    imConfig.headers = {
        ...imConfig.headers,
        ...formData.getHeaders()
    };
    return await util.httpImCall(imConfig);
}

methods.getMarkedTickets = async (syncInterval, imConfigObject) => {

    const imStatus = Object.keys(imConfigObject.jiraToAppScanStatusMapping);
    let jql = "";
    imStatus.forEach((status) => {
        jql += `(status CHANGED TO ${status} during (-${syncInterval},now()) AND status = ${status}) OR `;
    });
    jql = jql.substring(0, jql.length - 4);//removing the last OR
    jql = encodeURIComponent(jql);

    // const url = imConfigObject.imurl + constants.JIRA_LATEST_ISSUE.replace("{SYNCINTERVAL}", syncInterval)
    const url = imConfigObject.imurl + constants.JIRA_ISSUE_SEARCH + jql;
    let userData = imConfigObject.imUserName + ":" + imConfigObject.imPassword;
    var basicToken = `Basic ${Buffer.from(userData).toString('base64')}`;
    const imConfig = getConfig("GET", basicToken, url, "");
    return await util.httpImCall(imConfig);
}

methods.getTicketsByProject = async (projectName, imConfigObject, skipValue) => {
    const url = imConfigObject.imurl + constants.JIRA_LABELS_ISSUE.replace("{PROJECTNAME}", projectName).replace("{SKIPVALUE}", skipValue)
    let userData = imConfigObject.imUserName + ":" + imConfigObject.imPassword;
    var basicToken = `Basic ${Buffer.from(userData).toString('base64')}`;
    const imConfig = getConfig("GET", basicToken, url, "");
    return await util.httpImCall(imConfig);
}

methods.getJiraStatuses = async (projectName, imConfigObject) => {
    const url = imConfigObject.imurl + constants.JIRA_STATUS.replace("{PROJECTNAME}", projectName)
    let userData = imConfigObject.imUserName + ":" + imConfigObject.imPassword;
    var basicToken = `Basic ${Buffer.from(userData).toString('base64')}`;
    const imConfig = getConfig("GET", basicToken, url, "");
    return await util.httpImCall(imConfig);
}

methods.validateJiraFieldIds = async (imConfigObject) => {
    try {
        const url = imConfigObject.imurl + constants.JIRA_GET_FIELDS;
        let userData = imConfigObject.imUserName + ":" + imConfigObject.imPassword;
        var basicToken = `Basic ${Buffer.from(userData).toString('base64')}`;
        const imConfig = getConfig("GET", basicToken, url, "");
        const fieldIds = Object.values(imConfigObject.attributeMappings).map(mapping => mapping.imAttrId);

        const result = await util.httpImCall(imConfig);

        global.imFields = new Map(result.data.map(field => [field.id, { id: field.id, name: field.name, type: field.schema?.type }]));

        const existingFieldIds = result.data.map(field => field.id);
        const invalidFieldIds = fieldIds.filter(fieldId => !existingFieldIds.includes(fieldId));
        if (invalidFieldIds.length > 0) {
            logger.error(`Invalid imAttrId found in attributeMappings: ${invalidFieldIds.join(", ")}`);
            logger.info(`Valid field IDs are: ${Array.from(global.imFields.values()).map(field => `{id: ${field.id}, name: ${field.name}}`).join(", ")}`);
            return false;
        }

        return true;
    } catch (error) {
        logger.error(`Failed to validate field IDs and the error is ${JSON.stringify(error.response.data)}`);
        return false;
    }
};


const getConfig = function (method, token, url, data) {
    return {
        method: method,
        url: url,
        data: data,
        rejectUnauthorized: false,
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Atlassian-Token': 'nocheck'
        }
    };
}

const getApplicationDetails = async (appId, token) => {
    if (process.env.APPSCAN_PROVIDER == 'ASE') {
        const url = constants.ASE_APPLICATION_DETAILS.replace("{APPID}", appId);
        return await util.httpCall("GET", token, url);
    }
    else {
        const url = constants.ASoC_APPLICATION_DETAILS.replace("{APPID}", appId);
        return await util.httpCall("GET", token, url);
    }

};

const getApplicationMnemonic = (data) => {
    if (process.env.APPSCAN_PROVIDER == 'ASE') {
        const attributes = data.attributeCollection.attributeArray;
        for (const attribute of attributes) {
            if (attribute.name === "Application Mnemonic") {
                return attribute.value[0];
            }
        }
    }
    return null;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = methods;
