const util = require("../../utils/util");
const constants = require("../../utils/constants");

var methods = {};

methods.getScanJobDetails = async (token, skipValue, jobId) => {
    const url = constants.ASoC_SCAN_ISSUE_DETAILS.replace("{SCANID}", jobId).replace('${skipValue}', skipValue);
    return await util.httpCall("GET", token, url);
};

methods.searchJobs = async (token, skipValue, queryString) => {
    const url = queryString.replace('${skipValue}', skipValue);
    let result = await util.httpCall("GET", token, url);
    return result;
};

module.exports = methods;
