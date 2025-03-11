const util = require("../../utils/util");
const constants = require("../../utils/constants");

var methods = {};

methods.getScanJobDetails = async (jobId, token) => {
    const url = constants.ASE_SCAN_DETAILS.replace("{JOBID}", jobId);
    return await util.httpCall("GET", token, url);
};

methods.searchJobs = async (queryString, token) => {
    const url = constants.ASE_JOB_SEARCH+"?queryString="+queryString;
    return await util.httpCall("GET", token, url);  
};

module.exports = methods;
