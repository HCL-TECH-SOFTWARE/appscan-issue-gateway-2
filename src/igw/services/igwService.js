/*
 *
 * Copyright 2025,2026 HCL America, Inc.
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

const aseJobService = require("../../ase/service/jobService");
const asocJobService = require("../../asoc/service/jobService");
const jiraService = require("./jiraService");
const aseAuthService = require('../../ase/service/authService');
const asocAuthService = require('../../asoc/service/authService');
const credentialService = require('../../utils/credentialService');
var methods = {};
const constants = require("../../utils/constants");
const log4js = require("log4js");
const logger = log4js.getLogger("igwService");
const fs = require('fs');
const cheerio = require('cheerio');
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
const addData = require('../../utils/htmlTemplate');

methods.aseLogin = async () => {
    var inputData = {};
    inputData["keyId"] = await credentialService.getKeyId();
    inputData["keySecret"] = await credentialService.getKeySecret();
    
    if (!inputData["keyId"] || !inputData["keySecret"]) {
        throw new Error("AppScan credentials not found in secure storage. Please set them first.");
    }
    
    const result = await aseAuthService.keyLogin(inputData);
    return result.data.sessionId;
}

methods.asocLogin = async () => {
    var inputData = {};
    inputData["keyId"] = await credentialService.getKeyId();
    inputData["keySecret"] = await credentialService.getKeySecret();
    inputData["clientType"] = getClientType();
    
    if (!inputData["keyId"] || !inputData["keySecret"]) {
        throw new Error("AppScan credentials not found in secure storage. Please set them first.");
    }
    
    const result = await asocAuthService.keyLogin(inputData);
    return result.data.Token;
}

const getClientType = () => {
    const aigVersion = getAIGVersion();
    const os = process.platform;
    return constants.ASOC_CLIENT_TYPE.replace("<OS>", os).replace("<AIG version>", aigVersion);
}

const getAIGVersion = () => {
  const packageJson = require('../../../package.json');
  return packageJson.version;
}

methods.getCompletedScans = async (syncInterval, aseToken) => {
    var date = new Date();
    date.setDate(date.getDate() - syncInterval);
    const fDate = date.toISOString().slice(0, 10);
    const startDate = date.toISOString();

    date = new Date();
    const tDate = date.toISOString().slice(0, 10);
    const endDate = date.toISOString();

    if (process.env.APPSCAN_PROVIDER == "ASE") {
        const queryString = "LastRanBetweenFromAndTodate=" + fDate + "|" + tDate + ",JobType=1|2";
        logger.info(`Fetching scans completed between ${fDate} and ${tDate}`);
        return await aseJobService.searchJobs(queryString, aseToken);
    } else if (process.env.APPSCAN_PROVIDER == "ASoC" || process.env.APPSCAN_PROVIDER == 'A360') {
        const queryString = constants.ASoC_JOB_SEARCH;
        logger.info(`Fetching scans completed between ${new Date(startDate).toLocaleString()} and ${new Date(endDate).toLocaleString()}`);
        let result = await fetchAllData(asocJobService.searchJobs, aseToken, 200, [queryString]);
        result.data = result.data.Items.filter(a => a?.LatestExecution?.Status == 'Ready').filter(a => a?.LatestExecution?.ScanEndTime <= endDate && a?.LatestExecution?.ScanEndTime >= startDate);
        return result;
    }
}

methods.filterIssues = async (issues, imConfig) => {
    const issueStates = imConfig.issuestates;
    const issueSeverities = imConfig.issueseverities;

    var issueStatesArray = [];
    var issueSeveritiesArray = [];

    if (typeof issueStates != 'undefined') issueStatesArray = issueStates.split(",");
    if (typeof issueSeverities != 'undefined') issueSeveritiesArray = issueSeverities.split(",");

    var filteredIssues = [];
    if (issueStatesArray.length > 0) filteredIssues = issues.filter(issue => issueStatesArray.includes(issue["Status"]));
    if (issueSeveritiesArray.length > 0) filteredIssues = filteredIssues.filter(issue => issueSeveritiesArray.includes(issue["Severity"]));
    if (process.env.APPSCAN_PROVIDER == 'ASE') {
        filteredIssues = filteredIssues.filter(issue => (typeof (issue["External ID"]) === 'undefined' || issue["External ID"].length == 0));
    } else if (process.env.APPSCAN_PROVIDER == 'ASoC' || process.env.APPSCAN_PROVIDER == 'A360') {
        filteredIssues = filteredIssues.filter(issue => (issue["ExternalId"] === null || issue["ExternalID"] == 'undefined'));
    }

    const maxIssues = (typeof imConfig.maxissues != 'undefined') ? imConfig.maxissues : 10000;
    filteredIssues = (typeof filteredIssues === 'undefined') ? [] : filteredIssues.slice(0, maxIssues);
    return filteredIssues;
}

methods.createImTickets = async (filteredIssues, imConfig, providerId, applicationId, applicationName) => {
    var result;
    if (providerId === constants.DTS_JIRA)
        result = await jiraService.createTickets(filteredIssues, imConfig, applicationId, applicationName);

    return result;
}

methods.updateImTickets = async (bodyData, imConfig, providerId, applicationId, projectKey) => {
    var result;
    if (providerId === constants.DTS_JIRA)
        result = await jiraService.updateTickets(bodyData, imConfig, applicationId, projectKey);

    return result;
}

methods.updateImStatus = async (providerId, imConfig, bodyData, projectKey) => {
    let result;
    if (providerId === constants.DTS_JIRA) {
        result = await jiraService.updateImStatus(imConfig, bodyData, projectKey);
    }

    return result;
}

methods.createImScanTickets = async (filteredIssues, imConfig, providerId, applicationId, applicationName, scanId, discoveryMethod) => {
    var result;
    if (providerId === constants.DTS_JIRA)
        result = await jiraService.createScanTickets(filteredIssues, imConfig, applicationId, applicationName, scanId, discoveryMethod);

    return result;
}

methods.getLatestImTickets = async (providerId, syncInterval, imConfig) => {
    var result;
    if (providerId === constants.DTS_JIRA) {
        result = await jiraService.getMarkedTickets(syncInterval, imConfig);
    }
    return result;
}

methods.getLatestImTicketsByProject = async (providerId, projectName, imConfig, skipValue) => {
    var result;
    if (providerId === constants.DTS_JIRA)
        result = await jiraService.getTicketsByProject(projectName, imConfig, skipValue);
    return result;
}

methods.attachIssueDataFile = async (ticket, downloadPath, imConfig, providerId) => {
    var result;
    if (providerId === constants.DTS_JIRA) {
        try {
            result = await jiraService.attachIssueDataFile(ticket.split("/browse/")[1], downloadPath, imConfig);
            logger.info(`Reports Attached to ${ticket}`)
        } catch (err) {
            logger.error(err.message)
        }
        return result
        // try {
        //     let data = fs.readFileSync(downloadPath, 'utf8')
        //     let jObj = parser.parse(data);
        //     let {
        //         company,
        //         department,
        //         "application-name": applicationName,
        //         "business-impact": businessImpact,
        //         "report-date": reportDate,
        //         coverage,
        //         "total-issues-in-application": totalIssuesInApplication,
        //         "personal-scan-message": personalScanMessage,
        //         "personal-scan-max-days": personalScanMaxDays,
        //         "issues-count-limit": issuesCountLimit,
        //         "issues-count-limit-message": issuesCountLimitMessage,
        //         deployment,
        //     } = jObj['xml-report'].layout;

        //     // ISSUE GROUP
        //     let test1 = jObj['xml-report']['issue-group'].item.map(a => ({
        //         asocIssueId: a["asoc-issue-id"],
        //         status: a.status,
        //         severity: a.severity,
        //         fixGroupId: a["fix-group-id"] || "",
        //         location: a.location,
        //         cvss: a.cvss,
        //         location: a.location,
        //         sourceFile: a["source-file"],
        //         dateCreated: a["date-created"],
        //         lastUpdated: a["last-updated"],
        //         cve: a.cve,
        //         cwe: a.cwe.ref || a.cwe,
        //         domain: a.domain,
        //         displayName: a["variant-group"]?.item['issue-information']?.['display-name'] || "",
        //         reasoning: a["variant-group"]?.item.reasoning || "",
        //         testHttpTraffic: a["variant-group"]?.item["test-http-traffic"] || "",
        //         description: a["variant-group"].item["issue-information"]?.['description'] || "",
        //         fixResolutionText: a["variant-group"]?.item["issue-information"]?.["fix-resolution-text"] || "",
        //         urlForInfo: a["variant-group"]?.item["issue-information"]?.["url-for-info"] || "",
        //         auditTrail: a['changes-group']?.item?.details?.item || "",
        //         // dateCreated: a['changes-group']?.item?.['date-created'] || "",
        //         issueTypeName: a['issue-type-name'],
        //         issueTypeAttr: a['issue-type']?.ref,
        //         fixRemediation: a?.fix?.item?.remediation || "",
        //         commentGroup: a['comments-group']?.comment || ""
        //         // CVSS Version
        //     }))
        //     let test2 = jObj['xml-report']['article-group'].item.map(a => ({
        //         cwe: a?.cwe,
        //         cause: a?.cause?.item || null,
        //         risk: a?.risk?.item || null,
        //         fixrecommendations: a?.recommendations?.item || null,
        //         externalReferences: a?.externalReferences?.item || null
        //     }))
        //     let mergedData = test1.map(item1 => ({
        //         ...test2.find((item2) => item1.cwe == item2.cwe),
        //         ...item1,
        //     }));

        //     fs.readdir('./temp1', (error, files) => {
        //         if (error) {
        //             console.log(error);
        //         } else {
        //             if (files.length == 0) {
        //                 mergedData.map(a => {
        //                     if (a.asocIssueId == '0c68db8f-ee9b-ea11-86e9-00155d55406c0') {
        //                         if (a.externalReferences == undefined) {
        //                             a.externalReferences = `<li><a href=""></a></li>`
        //                         } else if (a.externalReferences.length > 1) {
        //                             let tempReference = '';
        //                             a.externalReferences.map(res => {
        //                                 tempReference += `<li><a href="${res.url}">${res.title}</a></li>`
        //                             })
        //                             a.externalReferences = tempReference

        //                         } else {
        //                             a.externalReferences = `<li><a href="${a.externalReferences.url}">${a.externalReferences.title}</a></li>`
        //                         }
        //                         if (typeof a.risk == 'object' && a?.risk?.length > 1 && a?.risk != undefined) {
        //                             let tempData = ''
        //                             a?.risk?.forEach(res => tempData += (res + '<br><br>'));
        //                             a.risk = tempData;
        //                         }

        //                         if (a.commentGroup == '') {
        //                             a.commentGroup == ''
        //                         } else if (a.commentGroup.length > 1) {
        //                             let tempReference = '';
        //                             a.commentGroup.map(res => {
        //                                 tempReference = `
        //                                 <tr class="row" style="word-break: normal">
        //                                     <td width="20%" style="word-break: normal">
        //                                         ${res['date-created']}
        //                                     </td>
        //                                     <td width="20%" style="word-break: normal">${res['created-by-username']}</td>
        //                                     <td style="word-break: break-word">AppScan Issue Gateway created the following issue:
        //                                         ${res['comment-text']}
        //                                     </td>
        //                                 </tr>`
        //                             })
        //                             a.commentGroup == `
        //                                 <tr class="row" style="word-break: normal">
        //                                     <td width="20%" style="word-break: normal">
        //                                         07/14/2023 11:54:45
        //                                     </td>
        //                                     <td width="20%" style="word-break: normal">karthik.karkera@hcl.com</td>
        //                                     <td style="word-break: break-word">AppScan Issue Gateway created the following issue:
        //                                         http://localhost:8080/browse/IGW-58
        //                                     </td>
        //                                 </tr>`
        //                         } else {
        //                             a.commentGroup = `<tr class="row" style="word-break: normal">
        //                                 <td width="20%" style="word-break: normal">
        //                                     ${a.commentGroup['date-created']}
        //                                 </td>
        //                                 <td width="20%" style="word-break: normal">${a.commentGroup['created-by-username']}</td>
        //                                 <td style="word-break: break-word">AppScan Issue Gateway created the following issue:
        //                                     ${a.commentGroup['comment-text']}
        //                                 </td>
        //                             </tr>`
        //                         }
        //                         let severityClass = a.severity == 'Informational' ? 'severity_0' : a.severity == 'Low' ? 'severity_1' : a.severity == 'Medium' ? 'severity_2' : a.severity == 'High' ? 'severity_3' : 'severity_4';
        //                         let htmlReports = addData.addData({ company, department, applicationName, businessImpact, reportDate, coverage, totalIssuesInApplication, personalScanMessage, personalScanMaxDays, issuesCountLimit, issuesCountLimitMessage, deployment, asocIssueId: a.asocIssueId, status: a.status, severity: a.severity, fixGroupId: a.fixGroupId, location: a.location, sourceFile: a.sourceFile, cvss: a.cvss, dateCreated: a.dateCreated, lastUpdated: a.lastUpdated, cve: a.cve, cwe: a.cwe, domain: a.domain, displayName: a.displayName, reasoning: a.reasoning, testHttpTraffic: a.testHttpTraffic, description: a.description, fixResolutionText: a.fixResolutionText, urlForInfo: a.urlForInfo, auditTrail: a.auditTrail, issueTypeName: a.issueTypeName, cause: a.cause, risk: a.risk, fixrecommendations: a.fixrecommendations, externalReferences: a.externalReferences, severityClass, issueTypeAttr: a.issueTypeAttr, fixRemediation: a.fixRemediation, commentGroup: a.commentGroup });


        //                         fs.writeFile(`./temp1/${a.asocIssueId}_.html`, htmlReports, async err => {
        //                             if (err) console.log(err);

        //                             result = await jiraService.attachIssueDataFile(ticket.split("/browse/")[1], `./temp1/${a.asocIssueId}_.html`, imConfig);
        //                             return result
        //                         })
        //                     }
        //                 })
        //             }
        //         }
        //     });


        // } catch (err) {
        //     logger.error(err)
        // }
        // --------

        // -------
        // setTimeout(async () => {
        // let jiraHtmlDownloadPath = './temp/' + downloadPath.split('/')[2].split('.')[0] + '.html'
        // console.log(jiraHtmlDownloadPath, '/////////////////////////')
        // result = await jiraService.attachIssueDataFile(ticket.split("/browse/")[1], jiraHtmlDownloadPath, imConfig);
        // }, 10000)

        // return result;
    }
}

methods.addJiraAttach = async (ticket, downloadPath, imConfig, providerId) => {
    let jiraHtmlDownloadPath = './temp/' + downloadPath.split('/')[2].split('.')[0] + '.html';
    if (fs.existsSync(jiraHtmlDownloadPath)) {
    }
    result = await jiraService.attachIssueDataFile(ticket.split("/browse/")[1], jiraHtmlDownloadPath, imConfig);
    return result;
}

methods.splitXmlFile = async (downloadPath, appId) => {
    try {
        let data = fs.readFileSync(downloadPath, 'utf8');
        let options = {
            ignoreAttributes: false,
            allowBooleanAttributes: true,
            parseAttributeValue: true,
        }
        const parser = new XMLParser(options);
        let jObj = parser.parse(data);
        let {
            company,
            department,
            "application-name": applicationName,
            "business-impact": businessImpact,
            "report-date": reportDate,
            coverage,
            "total-issues-in-application": totalIssuesInApplication,
            "personal-scan-message": personalScanMessage,
            "personal-scan-max-days": personalScanMaxDays,
            "issues-count-limit": issuesCountLimit,
            "issues-count-limit-message": issuesCountLimitMessage,
            deployment,
        } = jObj['xml-report'].layout;

        let test1 = jObj['xml-report']['issue-group'].item.map(a => ({
            asocIssueId: a["asoc-issue-id"],
            status: a.status,
            severity: a.severity,
            fixGroupId: a["fix-group-id"] || "",
            location: a.location || '',
            domain: a.domain || '',
            element: a.element || '',
            path: a.path || '',
            scheme: a.scheme || '',
            technology: a.technology,
            cvss: a.cvss || '',
            sourceFile: a["source-file"] || '',
            dateCreated: a["date-created"],
            lastUpdated: a["last-updated"],
            cve: a.cve || '',
            cwe: a.cwe.ref || a.cwe,
            displayName: a["variant-group"]?.item['issue-information']?.['display-name']?.['#text'] || "",
            reasoning: a["variant-group"]?.item.reasoning?.['#text'] || "",
            testHttpTraffic: a["variant-group"]?.item["test-http-traffic"] || "",
            differences: a["variant-group"]?.item?.differences || "",
            elementType: a['element-type'] || '',
            line: a['line'] || '',
            callingMethod: a['calling-method'] || '',
            description: a["variant-group"].item["issue-information"]?.['description']?.['#text'] || "",
            fixResolutionText: a["variant-group"]?.item["issue-information"]?.["fix-resolution-text"]?.['#text'] || "",
            urlForInfo: a["variant-group"]?.item["issue-information"]?.["url-for-info"]?.['#text'] || "",
            auditTrail: a['changes-group']?.item || "",
            issueTypeName: a['issue-type-name'],
            issueTypeAttr: a?.['issue-type']?.ref || '',
            fixRemediation: a?.fix?.item?.remediation?.['#text'] || "",
            fixName: a?.fix?.item?.general?.text || '',
            commentGroup: a['comments-group']?.comment || "",
            publishDate: a['variant-group']?.item?.['issue-information']?.['publish-date']?.['#text'] || '',
            variantGroupType: a["variant-group"]?.item["issue-information"]?.["@_type"] || '',
            traceSignature: a["variant-group"]?.item["issue-information"]?.['call-trace']?.['call-invocation']?.['@_signature'],
            trace: (function () {
                let path = a['variant-group']?.['item']['issue-information']?.['call-trace']?.['call-invocation'] || ''
                function getTrace(tracePath) {
                    if (Array.isArray(tracePath)) {
                        return tracePath.map(trace => {
                            if (trace['call-invocation']) {
                                return getTrace(trace['call-invocation'])
                            } else {
                                return getTrace(trace)
                            }
                        })
                    } else {
                        let data = `<tr><td class=""><table cellpadding="0" cellspacing="0"><tbody><tr valign="middle">${(() => {
                            let content = '';
                            for (let i = 0; i < tracePath['@_method-call']; i++) {
                                if (tracePath['@_type'] == 'Sink') {
                                    content += `<td><div class="methodTraceSink_gif"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Sink"></div></td>`
                                } else if (tracePath['@_type'] == 'None') {
                                    content += `<td><div class="method_gif"></div></td>`
                                } else if (tracePath['@_type'] == 'Source') {
                                    content += `<td><div class="iotsource_gif"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Source"></div></td>`
                                }
                            }
                            return content
                        })()} <td style="padding: 5px;"><span style="font-weight: bold;">${!tracePath['@_filename'] ? tracePath['@_signature'] : tracePath['@_filename']}<br>${tracePath?.context?.['#text'] != undefined && tracePath?.context?.['#text'].includes('.') ? tracePath?.context?.['#text'] : ''}</span></td></tr></tbody></table></td></tr>`;
                        if (tracePath['call-invocation']) {
                            return data + getTrace(tracePath['call-invocation'])
                        } else {
                            return data;
                        }
                    }
                }
                if (path != '') {
                    return getTrace(path)
                } else {
                    return ''
                }
            })()
        }))
        let fixGroupData = jObj['xml-report']['fix-group-group']?.item.map(res => ({
            fixGroupLocation: res?.Location,
            fixGroupId: res?.['@_id'],
            fixGroupSeverity: res?.["@_severityId"],
            fixGroupType: res?.["@_type"]
        }))

        let fixGroupMerged = test1.map(item1 => ({
            ...fixGroupData.find((item2) => item1.fixGroupId == item2.fixGroupId),
            ...item1,
        }));

        let articleGroupData = jObj['xml-report']['article-group'].item.map(a => ({
            cwe: a?.cwe?.['#text'] || '',
            cause: Array.isArray(a?.cause?.item) ? a?.cause?.item.map(res => {
                if (res['#text']) {
                    return res['#text']
                }
                else if (res['codeBlock']) {
                    if (Array.isArray(res['codeBlock'].item)) {
                        return `<div class="code"> ${res['codeBlock']?.item.map(codeBlockItem => `<xmp> ${codeBlockItem?.['#text']}</xmp>`).join('')} <br></div>`;
                    } else {
                        return `<div class="code"><xmp> ${res['codeBlock']?.item?.['#text']} </xmp></div>`;
                    }
                }
            }).join(',') : a?.cause?.item?.['#text'] || null,
            risk: Array.isArray(a?.risk?.item) ? a?.risk?.item.map(res => res?.['#text']).join(',') : a?.risk?.item?.['#text'] || null,
            fixrecommendations: Array.isArray(a?.recommendations?.item) ? a?.recommendations?.item.map(res => {
                if (res['#text']) {
                    return res['#text']
                }
                else if (res['codeBlock']) {
                    if (Array.isArray(res['codeBlock'].item)) {
                        return `<div class="code"> ${res['codeBlock']?.item.map(codeBlockItem => `<xmp> ${codeBlockItem?.['#text']}</xmp>`).join('')} <br></div>`;
                    } else {
                        return `<div class="code"><xmp> ${res['codeBlock']?.item?.['#text']} </xmp></div>`;
                    }
                }
            }).join(',') : a?.recommendations?.item?.['#text'] || null,
            exploitSamplesMain: a?.exploitSamples?.item?.title?.['#text'] || '',
            exploitSamples: a?.exploitSamples?.item?.exploitBlock.item.map(res => {
                if (res?.explanation) {
                    var explanation = res?.explanation?.['#text']
                }
                if (res?.request) {
                    if (Array.isArray(res?.request?.item)) {
                        var request = `<div class="code"> ${res?.request?.item.map(req => `<xmp> ${req?.['#text']}</xmp>`).join('')} <br></div>`;
                    } else {
                        var request = `<div class="code"><xmp> ${res?.request?.item?.['#text']} </xmp></div>`;
                    }
                }
                if (res?.response) {
                    if (Array.isArray(res?.response?.item)) {
                        var response = `<div class="code"> ${res?.response?.item.map(req => `<xmp> ${req?.['#text']}</xmp>`).join('')} <br></div>`;
                    } else {
                        var response = `<div class="code"><xmp> ${res?.response?.item?.['#text']} </xmp></div>`;
                    }
                }
                return `${explanation} ${request} ${response}`
            }).join("") || '',
            externalReferences: a?.externalReferences?.item || null,
            displayName: a?.displayName?.['#text'] || '',
            appScanId: a?.appscanId?.['#text'] || '',
            articleGroupId: a?.["@_id"] || '',
            articleGroupApi: a?.["@_api"] || '',
        }))
        let mergedData = fixGroupMerged.map(item1 => ({
            ...articleGroupData.find((item2) => item1.fixGroupType == 'API' ? item1.issueTypeAttr == item2.articleGroupId && item1.fixRemediation == item2.articleGroupApi : item1.issueTypeAttr == item2.articleGroupId),
            ...item1,
        }));

        if (require("fs").existsSync(downloadPath)) {
            mergedData.map(a => {
                if (a.externalReferences == undefined) {
                    a.externalReferences = `<li><a href=""></a></li>`
                } else if (Array.isArray(a?.externalReferences)) {
                    let tempReference = '';
                    a.externalReferences.map(res => {
                        tempReference += `<li><a href="${res.url?.['#text']}">${res.title?.['#text']}</a></li>`
                    })
                    a.externalReferences = tempReference
                } else {
                    a.externalReferences = `<li><a href="${a.externalReferences?.url?.['#text']}">${a.externalReferences.title?.['#text']}</a></li>`
                }
                if (typeof a.risk == 'object' && a?.risk?.length > 1 && a?.risk != undefined) {
                    let tempData = ''
                    a?.risk?.forEach(res => tempData += (res + '<br><br>'));
                    a.risk = tempData;
                }

                if (a.commentGroup == '') {
                    a.commentGroup == ''
                } else if (a.commentGroup.length > 1) {
                    let tempReference = '';
                    a.commentGroup.map(res => {
                        tempReference = `
                                    <tr class="row" style="word-break: normal">
                                        <td width="20%" style="word-break: normal">
                                            ${res['date-created']}
                                        </td>
                                        <td width="20%" style="word-break: normal">${res['created-by-username']}</td>
                                        <td style="word-break: break-word">AppScan Issue Gateway created the following issue:
                                            ${res['comment-text']}
                                        </td>
                                    </tr>`
                    })
                } else {
                    a.commentGroup = `<tr class="row" style="word-break: normal">
                                    <td width="20%" style="word-break: normal">
                                        ${a.commentGroup['date-created']}
                                    </td>
                                    <td width="20%" style="word-break: normal">${a.commentGroup['created-by-username']}</td>
                                    <td style="word-break: break-word">AppScan Issue Gateway created the following issue:
                                        ${a.commentGroup['comment-text']}
                                    </td>
                                </tr>`
                }
                if (a.auditTrail != '' && Array.isArray(a.auditTrail)) {

                    a.auditTrail = a.auditTrail.map(item => `<tr class="row">
                    <td width="20%" style="word-break: normal">${item['date-created']}</td>
                    <td width="20%" style="word-break: normal">${item['created-by'] || ''}</td>
                    <td style="word-break: break-word">${item.details.item}</td>
                    </tr>`)
                } else if (a.auditTrail != '' && !Array.isArray(a.auditTrail)) {
                    a.auditTrail = `<tr class="row">
                    <td width="20%" style="word-break: normal">${a.auditTrail['date-created']}</td>
                    <td width="20%" style="word-break: normal"></td>
                    <td style="word-break: break-word">${a.auditTrail.details.item}</td>
                    </tr>`;
                }
                let severityClass = a.severity == 'Informational' ? 'severity_0' : a.severity == 'Low' ? 'severity_1' : a.severity == 'Medium' ? 'severity_2' : a.severity == 'High' ? 'severity_3' : 'severity_4';
                let htmlReports = addData.addData({ company, department, applicationName, businessImpact, reportDate, coverage, totalIssuesInApplication, personalScanMessage, personalScanMaxDays, issuesCountLimit, issuesCountLimitMessage, deployment, asocIssueId: a.asocIssueId, status: a.status, severity: a.severity, fixGroupId: a.fixGroupId, location: a.location, domain: a.domain, element: a.element, path: a.path, scheme: a.scheme, technology: a.technology, sourceFile: a.sourceFile, cvss: a.cvss, dateCreated: a.dateCreated, lastUpdated: a.lastUpdated, exploitSamples: a.exploitSamples, exploitSamplesMain: a.exploitSamplesMain, cve: a.cve, cwe: a.cwe, domain: a.domain, displayName: a.displayName, reasoning: a.reasoning, testHttpTraffic: a.testHttpTraffic, elementType: a.elementType, line: a.line, callingMethod: a.callingMethod, description: a.description, fixResolutionText: a.fixResolutionText, urlForInfo: a.urlForInfo, auditTrail: a.auditTrail, issueTypeName: a.issueTypeName, cause: a.cause, risk: a.risk, fixrecommendations: a.fixrecommendations, externalReferences: a.externalReferences, severityClass, issueTypeAttr: a.issueTypeAttr, fixName: a.fixName, fixRemediation: a.fixRemediation, commentGroup: a.commentGroup, publishDate: a.publishDate, variantGroupType: a.variantGroupType, trace: a.trace });
                fs.writeFile(`./tempReports/${appId}_${a.asocIssueId}.html`, htmlReports, async err => {
                    if (err) {
                        logger.error(`Error Splitting XML file for ${appId} - ${a.asocIssueId} - ${err}`)
                    };
                })
            })
        } else {
            logger.error(`File for splitting not in directort for Application Id - ${appId}`)
        }
    } catch (err) {
        logger.error(err)
    }
}

methods.splitHtmlFile = async (downloadPath, appId) => {
    try {
        const html = fs.readFileSync(downloadPath, 'utf-8');
        const $ = cheerio.load(html);
        const sections = {};
        const articleData = {};
        const articleLinks = $('a[name^="article-"]');
        let applicationName, businessImpact, reportName, reportDate;
        //Get Application Name & Business Impact
        $('h2').each((index, element) => {
            const text = $(element).text();
            if (text.includes('Application Name') && !applicationName) {
                applicationName = text.split(':')[1].trim();
            } else if (text.includes('Business Impact') && !businessImpact) {
                businessImpact = text.split(':')[1].trim();
            }
        })
        //Get Report Name & Report Creation Date
        $('h4').each((index, element) => {
            const text = $(element).text();
            if (text.includes('Report Name') && !reportName) {
                reportName = text.split(':')[1].trim()
            } else if (text.includes('Report created at') && !reportDate) {
                reportDate = text.split(':')[1].trim();
            }
        })
        // ISSUE
        $('.issueHeader').each((index, element) => {
            const $element = $(element);
            const issueName = $element.find('.row .name').text().trim();
            // Check if 'Fix Group ID:' is present in the issueName
            if (issueName.startsWith('Fix Group')) {
                // Skip the section if 'issueName' starts with 'Fix Group'
                return;
            }
            const issueId = $element.find('.row .name:contains("Issue ID:")').next('.value').text().trim();
            const fixGroupId = $element.find('.row .name:contains("Fix Group ID:")').next('.value').find('a').text().trim();
            const sectionHtml = $element.nextUntil('.issueHeader').addBack();
            sections[issueId] = { 'issue': String(sectionHtml), 'fixGroupId': fixGroupId }
        });
        let objKeys = Object.keys(sections);

        $('.issueType').each((index, element) => {
            const $element = $(element);
            const issueTypeHtml = $element.prop('outerHTML'); // Get the outer HTML of the issueType element
            const id = $element.attr('id');
            const nextIssueHeader = $element.next('.issueHeader').prop('outerHTML'); // Get the outer HTML of the next issueHeader element
            if (id && issueTypeHtml && nextIssueHeader) {
                var fixGroupIdHref = $(nextIssueHeader).find('.row .name:contains("How to Fix:")').next('.value').find('a').attr('href').split('#') || '';
            }

            const elementsInRange = $element.nextUntil('.issueType').addBack();
            const $elementsInRange = cheerio.load(String(elementsInRange));

            $elementsInRange('.issueHeader').each((index, element) => {
                const $element = $(element);
                const issueName = $element.find('.row .name').text().trim();
                // Check if 'Fix Group ID:' is present in the issueName
                if (issueName.startsWith('Fix Group')) {
                    // Skip the section if 'issueName' starts with 'Fix Group'
                    return;
                }
                const issueId = $element.find('.row .name:contains("Issue ID:")').next('.value').text().trim();
                const fixGroupId = $element.find('.row .name:contains("Fix Group ID:")').next('.value').find('a').text().trim();
                const howToFix = $(nextIssueHeader).find('.row .name:contains("How to Fix:")').next('.value').find('a').text();
                let sectionHtml = $element.nextUntil('.issueHeader').addBack();

                // Replace Count in Issue Title 
                if (sectionHtml.text().includes('Audit Trail')) {
                    sectionHtml.find('.h3group h3').text('Issue 1 of 1 - Details');
                } else if (sectionHtml.text().includes('Details')) {
                    sectionHtml.find('.h3group h3').text('Issue 1 of 1 - Details');
                } else if (sectionHtml.text().includes('Discussion')) {
                    sectionHtml.find('.h3group h3').text('Issue 1 of 1 - Discussion');
                }
                sectionHtml.find('.h3group h2').text('Issue 1 of 1');

                let fixGroupData = issueTypeHtml + nextIssueHeader;
                const severityElement = $element.find('.row .name:contains("Severity:")')
                const severityClass = severityElement.next('.value').text().trim() == 'Informational' ? 'severity_0' : severityElement.next('.value').text().trim() == 'Low' ? 'severity_1' : severityElement.next('.value').text().trim() == 'Medium' ? 'severity_2' : 'severity_3'

                const severity = $(element).find('.severity').text()
                sections[issueId] = { 'issue': String(sectionHtml), 'fixGroupId': fixGroupId, 'fixGroupData': fixGroupData, 'href': fixGroupIdHref, severityClass, howToFix }
            })

            if (id && issueTypeHtml && nextIssueHeader) {
                const fixGroupId = $(nextIssueHeader).find('.row .name:contains("How to Fix:")').next('.value').find('a').attr('href').split('#');
                const issueTypeName = $(nextIssueHeader).find('.row .name:contains("How to Fix:")').next('.value').text().trim()
                const severityClass = $(element).find('.severity').text() == 'I' ? 'severity_0' : $(element).find('.severity').text() == 'L' ? 'severity_1' : $(element).find('.severity').text() == 'M' ? 'severity_2' : 'severity_3'
            }
        });

        // HOW TO FIX
        articleLinks.each((index, element) => {
            const $element = $(element);
            const articleName = $element.attr('name');

            // Initialize a variable to store the HTML content for the current article
            let articleContent = $element.prop('outerHTML');

            // Find the next sibling element that is not another <a> tag with a name starting with "article-"
            let nextElement = $element.next();

            while (nextElement.length > 0 && !nextElement.is('a[name^="article-"]')) {
                // Append the HTML content of the current element to articleContent
                articleContent += nextElement.prop('outerHTML');
                // Move to the next sibling element
                nextElement = nextElement.next();
            }

            // Store the article content in the articleData object using the article name as the key
            articleData[articleName] = articleContent;
        });
        objKeys.map(issue => {
            if (sections[issue]['issue'] && issue != '' && sections[issue]['issue'] != '' && issue.length < 50) {
                let htmlReports = addData.addData({ applicationName, businessImpact, reportName, reportDate, issue: sections[issue]['issue'], fixGroupId: sections[issue]['fixGroupId'], issueTypeName: sections[issue]['issueTypeName'], severityClass: sections[issue]['severityClass'], "howToFix": articleData[`${sections[issue]?.['href']?.[1]}`] || '', "howToFixTitle": sections[issue]['howToFix'], "issueTypeAttr": sections[issue]?.['href']?.[1] || '', "fixGroupHeaderData": sections[issue]['fixGroupData'] });

                fs.writeFile(`./tempReports/${appId}_${issue}.html`, htmlReports, async err => {
                    if (err) {
                        logger.error(`Error Splitting HTML file for ${appId} - ${issue} - ${err}`)
                    };
                })
            }
        })
    } catch (err) {
        logger.error(err)
    }
}

const fetchAllData = async (serviceName, appscanToken, status, value) => {
    let skipValue = 0;
    let result = {};
    try {
        while (true) {
            try {
                let resData = value && value.length > 0 ? await serviceName(appscanToken, skipValue, ...value) : await serviceName(appscanToken, skipValue);
                if (resData.data.Count <= skipValue) {
                    break;
                }

                if (resData && Object.keys(result).length == 0 && resData.code == status && resData.data.Items.length >= 0) {
                    result = resData;
                } else if (resData && resData.code == status && resData.data.Items.length > 0) {
                    result.data.Items = [...resData?.data?.Items, ...result.data.Items]
                }
                if (skipValue > 15000) break;
            }
            catch (err) {
                logger.error(err?.response?.data.Message || err.message)
            }
            skipValue += 500;
        }
        return result;
    } catch (error) {
        console.error('Error fetching applications:', error);
        throw error;
    }
};

methods.getJiraIssueProperty = async (issueKey, imConfig) => {
    const issuePropertyResponse = await jiraService.getJiraIssueProperty(issueKey, imConfig);
    return issuePropertyResponse.data;
}

module.exports = methods;
