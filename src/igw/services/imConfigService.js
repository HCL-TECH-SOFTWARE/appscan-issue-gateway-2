const log4js = require("log4js");
const logger = log4js.getLogger("imConfigService");
const global = require("../../utils/global");
const fsPromise = require('fs').promises;
const fs = require('fs')
const jiraService = require("./jiraService");

var methods = {};

methods.getImConfigObject = async (providerId) => {
    var imConfig = imConfigs.get(providerId);

    if (imConfig === null || typeof imConfig === 'undefined') {
        const imFilePath = './config/' + providerId + '.json';
        const imProjectKeyPath = './config/projectKey.json';
        const imProjectScanKeyPath = './config/projectScanKey.json';
        if (fs.existsSync(imFilePath)) {
            try {
                imConfig = await fsPromise.readFile(imFilePath, 'utf8');
                imConfig = JSON.parse(imConfig);
                imProjectKey = await fsPromise.readFile(imProjectKeyPath, 'utf8');
                imProjectScanKey = await fsPromise.readFile(imProjectScanKeyPath, 'utf8');
                imProjectKey = JSON.parse(imProjectKey);
                imProjectScanKey = JSON.parse(imProjectScanKey);
                imConfig['improjectkey'] = imProjectKey;
                imConfig['improjectscanKey'] = imProjectScanKey;
                imConfig = JSON.stringify(imConfig, null, 2);
                const isValidConfig = await methods.validateImConfig(providerId, imConfig);
                if (!isValidConfig) {
                    return null;
                }
                imConfigs.set(providerId, imConfig);
            } catch (error) {
                logger.error(`Reading config file of ${providerId} failed with error ${error}.`);
                return null;
            }
        }
    }

    return imConfig;
};

methods.validateImConfig = async (providerId, imConfig) => {
    try {
        var imConfigObj = JSON.parse(imConfig);
        const requiredFields = [
            'maxissues', 'issuestates', 'issueseverities', 'imurl', 'imUserName', 'imPassword',
            'improjectkey', 'imissuetype', 'imSummary', 'severityPriorityMap', 'attributeMappings'
        ];
        for (const field of requiredFields) {
            if (!imConfigObj.hasOwnProperty(field)) {
                logger.error(`Validation of config file of ${providerId} failed, required field '${field}' is missing. Please refer to the sample config file for the required fields.`);
                return false;
            }
        }

        const isFieldsCorrect = await jiraService.validateJiraFieldIds(imConfigObj);

        if (!isFieldsCorrect) {
            return false;
        }

        if (!isCyclicStatusMapping(imConfigObj)) {
            return false;
        }

        return true;

    } catch (error) {
        logger.error(`Validation of config file of ${providerId} failed with error ${error}.`);
        return false;
    }
};

/**
 * Checks if the status mappings between AppScan and Jira are cyclic.
 * A cyclic dependency means that a status in AppScan maps to a status in Jira,
 * and that status in Jira maps back to the original status in AppScan, or vice versa.
 * 
 * @param {Object} imConfig - The configuration object containing status mappings.
 * @returns {boolean} - Returns `true` if there is a cyclic dependency, otherwise `false`.
 */
const isCyclicStatusMapping = (imConfig) => {
    const { appScanToJiraStatusMapping, jiraToAppScanStatusMapping } = imConfig;

    if (!appScanToJiraStatusMapping || !jiraToAppScanStatusMapping) {
        return true;
    }

    for (const key in appScanToJiraStatusMapping) {
        if (jiraToAppScanStatusMapping.hasOwnProperty(appScanToJiraStatusMapping[key])) {
            logger.error(`Validation of config file failed: cyclic status mapping detected. Please update the 'appScanToJiraStatusMapping' or 'jiraToAppScanStatusMapping' in 'JIRA.json' file to remove the cyclic dependency.`);
            return false;
        }
    }

    for (const key in jiraToAppScanStatusMapping) {
        if (appScanToJiraStatusMapping.hasOwnProperty(jiraToAppScanStatusMapping[key])) {
            logger.error(`Validation of config file failed: cyclic status mapping detected. Please update the 'jiraToAppScanStatusMapping' or 'appScanToJiraStatusMapping' in 'JIRA.json' file to remove the cyclic dependency.`);
            return false;
        }
    }

    return true;
};

module.exports = methods;