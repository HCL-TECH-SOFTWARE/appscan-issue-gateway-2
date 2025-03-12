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

const FormData = require("form-data");
const axios = require('axios').default;
var methods = {};

methods.httpCall = async function (method, token, url, data, etag, headers) {
  if (process.env.APPSCAN_PROVIDER == 'ASE') {
    const httpOptions = httpASEConfig(token, method, url, data, etag, headers);
    return await httpASECall(httpOptions);
  } else if (process.env.APPSCAN_PROVIDER == 'ASoC' || process.env.APPSCAN_PROVIDER == 'A360') {
    const httpOptions = httpASoCConfig(token, method, url, data, etag);
    let res = await httpASoCCall(httpOptions);;

    return res;

  }
}

const httpASEConfig = function (token, method, url, data, etag, headers) {
  return {
    method: method,
    url: `${process.env.APPSCAN_URL}${url}`,
    data: data,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'asc_session_id=' + token,
      'asc_xsrf_token': token,
      'If-Match': etag ? etag : '',
      ...headers
    }
  };
}

const httpASoCConfig = function (token, method, url, data, etag) {
  return {
    method: method,
    url: `${process.env.APPSCAN_URL}${url}`,
    data: data,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': 'asc_session_id=' + token,
      'asc_xsrf_token': token,
      'If-Match': etag ? etag : '',
      'Authorization': "Bearer " + token
    }
  };
}

const httpASECall = async (config) => {
  const result = await axios(config);
  if (result.headers["etag"] != 'undefined') result.data["etag"] = result.headers["etag"];
  return { "code": result.status, "data": result.data, "headers": result.headers };
}

const httpASoCCall = async (config) => {
  const result = await axios(config);
  if (result.headers["etag"] != 'undefined') result.data["etag"] = result.headers["etag"];
  return { "code": result.status, "data": result.data };
}

methods.httpFileUpload = async function (token, url, filePath, fileName) {
  var formData = new FormData();
  const stream = require("fs").createReadStream(filePath);

  formData.append("uploadedfile", stream, "file.dast.config");
  formData.append("asc_xsrf_token", token);

  const httpOptions = httpASEConfig(token, "POST", url, formData);
  return await httpASECall(httpOptions);
}


methods.downloadFile = async (url, downloadPath, token) => {
  const writer = require("fs").createWriteStream(downloadPath);
  if (process.env.APPSCAN_PROVIDER == 'ASE') {
    var httpOptions = httpASEConfig(token, "GET", url);
  } else if (process.env.APPSCAN_PROVIDER == 'ASoC' || process.env.APPSCAN_PROVIDER == 'A360') {
    var httpOptions = httpASoCConfig(token, "GET", url);
  }
  httpOptions["responseType"] = 'stream';
  return axios(httpOptions).then(response => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on('error', err => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(true);
        }
      });
    });
  });
}

methods.httpImCall = async (config) => {
  try {
    const result = await axios(config);
    return { "code": result.status, "data": result.data };
  }
  catch (err) {
    return { "code": err.response.status, "data": err.response.data };
  }

}

module.exports = methods;