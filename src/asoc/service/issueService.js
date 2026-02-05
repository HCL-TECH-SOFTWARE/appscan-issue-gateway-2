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
const log4js = require("log4js");
const logger = log4js.getLogger("igwController");
const constants = require("../../utils/constants");
const igwService = require('../../igw/services/igwService')
var methods = {};


methods.getIssuesOfApplication = async (token, skipValue, appId) => {
    const appDetails = await methods.getApplicationDetails(appId, token);
    try {
        let data = appDetails?.data?.Items[0];
        const url = constants.ASoC_ISSUES_APPLICATION.replace("{APPID}", appId).replace('${skipValue}', skipValue);
        let appData = await util.httpCall("GET", token, url);
        if (appData.code == 200) {
            appData.data.applicationName = data?.Name || '';
        }
        return appData;
    } catch (err) {
        logger.error(`Failed to Fetch Application Issues ${skipValue} ${err}`)
    }

};

methods.getIssuesOfScan = async (token, skipValue, scanId) => {
    const url = constants.ASoC_SCAN_ISSUE_DETAILS.replace("{SCANID}", scanId).replace('${skipValue}', skipValue);
    return await util.httpCall("GET", token, url);
};

methods.getScanDetails = async (scanId, technology, token) => {
    const url = technology == 'DynamicAnalyzer' ? constants.DAST_SCAN_DATA.replace("{SCANID}", scanId) : technology == 'StaticAnalyzer' ? constants.SAST_SCAN_DATA.replace("{SCANID}", scanId) : technology == "ScaAnalyzer" ? constants.SCA_SCAN_DATA.replace("{SCANID}", scanId) : constants.IAST_SCAN_DATA.replace("{SCANID}", scanId);
    return await util.httpCall("GET", token, url);
};

methods.updateIssuesOfApplication = async (appId, issueId, status, comment, externalId, token) => {
    const url = constants.ASoC_UPDATE_ISSUE.replace("{ISSUEID}", issueId).replace("{APPID}", appId);
    let data = {
        "Status": status,
        "Comment": comment
    };
    if (externalId) {
        data.ExternalId = externalId;
    }
    return await util.httpCall("PUT", token, url, data);
};

methods.getApplicationDetails = async (appId, token) => {
    const url = constants.ASoC_APPLICATION_DETAILS.replace("{APPID}", appId);
    return await util.httpCall("GET", token, url);
};

methods.getIssueDetails = async (appId, issueId, token) => {
    const url = constants.ASoC_ISSUE_DETAILS.replace("{ISSUEID}", issueId);
    var result = await util.httpCall("GET", token, url);
    var issue = result.data;
    if (result.code === 200) {
        var attributesArray = (issue?.attributeCollection?.attributeArray) ? (issue?.attributeCollection?.attributeArray) : [];
        var attribute = {};
        for (var i = 0; i < attributesArray.length; i++) {
            if ((attributesArray[i].value).length > 0)
                attribute[attributesArray[i].name] = (attributesArray[i].value)[0];
        }
        delete issue["attributeCollection"];
        result.data = Object.assign(issue, attribute);
    }
    return result;
}

methods.updateIssue = async (appId, issueId, data, token, eTag, scanId, isPersonalScan) => {
    let url;
    if (isPersonalScan) {
        url = constants.ASoC_UPDATE_SCAN_ISSUE.replace("{SCANID}", scanId).replace("{ISSUEID}", issueId);
    }
    else {
        url = constants.ASoC_UPDATE_ISSUE.replace("{ISSUEID}", issueId).replace("{APPID}", appId);
    }


    return await util.httpCall("PUT", token, url, JSON.stringify(data), eTag);
}

methods.getHTMLIssueDetails = async (appId, issueId, downloadPath, token) => {
    const createReportUrl = constants.ASoC_CREATE_HTML_SCAN_ISSUE_DETAILS.replace("{APPID}", appId);
    const data = constants.CREATE_REPORT_REQUEST_CONFIGURATION; //CREATE ISSUE PAYLOAD

    const reportID = 'f5eb6475-abff-468f-a35e-ac63d234c5a5'
    const getDownloadReportsUrl = await constants.ASoC_GET_HTML_ISSUE_DETAILS.replace("{REPORTID}", reportID); //GET REPORT DOWNLOAD URL
    const getReportStatusUrl = await constants.ASoC_REPORT_STATUS.replace("{REPORTID}", reportID); //GET REPORT STATUS

    let intervalid
    async function testFunction() {
        intervalid = setInterval(async () => {
            let getDownloadUrl = await util.httpCall("GET", token, getReportStatusUrl);
            if (getDownloadUrl.data.Status == 'Ready') {
                clearInterval(intervalid)
                return await util.downloadFile(getDownloadReportsUrl, downloadPath, token);
            }
        }, 3000)
    }
    await testFunction()

}

methods.downloadAsocReport = async (providerId, appId, scanId, issues, token) => {
    const createReportUrl = scanId != '' ? constants.ASoC_CREATE_HTML_SCAN_ISSUE_DETAILS.replace("{SCANID}", scanId) : constants.ASoC_CREATE_HTML_APP_ISSUE_DETAILS.replace("{APPID}", appId);
    const data = constants.CREATE_REPORT_REQUEST_CONFIGURATION; //CREATE ISSUE PAYLOAD

    try {
        let createIssue = await util.httpCall("POST", token, createReportUrl, data); //CREATE ISSUE REPORT;
        var reportID = await createIssue?.code == 200 ? createIssue?.data?.Id : createIssue;

        const getDownloadReportsUrl = await constants.ASoC_GET_HTML_ISSUE_DETAILS.replace("{REPORTID}", reportID); //GET REPORT DOWNLOAD URL
        const getReportStatusUrl = await constants.ASoC_REPORT_STATUS.replace("{REPORTID}", reportID); //GET REPORT STATUS

        var downloadPath = `./temp/${appId}.html`;
        let intervalid;
        async function splitFile() {
            return new Promise(
                function (resolve) {
                    return intervalid = setInterval(async () => {
                        try {
                            let getDownloadUrl = await util.httpCall("GET", token, getReportStatusUrl);
                            getDownloadUrl?.data?.Items.map(async res => {
                                if (res.Status == 'Ready' && res.Id == reportID) {
                                    let downloadFileData = await util.downloadFile(getDownloadReportsUrl, downloadPath, token);
                                    if (downloadFileData) {
                                        let res = await igwService.splitHtmlFile(downloadPath, appId)
                                        clearInterval(intervalid)
                                        resolve(res)
                                    }
                                }
                            })
                        } catch (err) {
                            logger.error(err)
                        }
                    }, 3000)
                }
            )
        }
        let splitFiles = await splitFile();
        return splitFiles;
    } catch (err) {
        throw err
    }
}


methods.getIssuesOfApplicationByStatusAndTime = async (appId, token, status, fromDateTime) => {
    try {
        const formattedFromDateTime = fromDateTime.replace(/:/g, "%3A");

        //Here we are iterating through the status array and creating a string for all the status values
        //e.g. if status = ['Open', 'Closed'] 
        // then statusString = 'Status%20eq%20%27Open%27%20or%20Status%20eq%20%27Closed%27
        // which is equivalent to Status eq 'Open' or Status eq 'Closed'
        let statusString = '';
        status.forEach((element, index) => {
            if (index == 0) {
                statusString = `Status%20eq%20%27${element}%27`
            } else {
                statusString = statusString + `%20or%20Status%20eq%20%27${element}%27`
            }
        });
        const url = constants.ASoC_ISSUES_APPLICATION_STATUS_TIME.replace("{APPID}", appId).replace("{STATUS}", statusString).replace("{DATERANGE}", formattedFromDateTime);
        return await util.httpCall("GET", token, url);
    }
    catch (err) {
        logger.error(err);
    }

}

module.exports = methods;
