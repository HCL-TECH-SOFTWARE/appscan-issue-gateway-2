const util = require("../../utils/util");
const constants = require("../../utils/constants");

var methods = {};

methods.keyLogin = async (inputData) => {
    const url = constants.ASoC_API_KEYLOGIN;
    return await util.httpCall("POST", "", url, JSON.stringify(inputData));
};

module.exports = methods;