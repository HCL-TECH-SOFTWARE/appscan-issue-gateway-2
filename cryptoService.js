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

var crypto = require('crypto');
var constants = require('./src/utils/constants');
var args = process.argv.slice(2);
var cmdprogram = require('commander');

const algorithm = "aes-256-cbc";
let Securitykey = 'Exchange6547wordP22swordExc$$nge';
let initVector = 'b364e6196d8db737';
var methods = {};

cmdprogram
    .option('--encrypt <string>', 'Encrypt the string')
    .option('--decrypt <string>', 'Decrypt the string')
    .option('--hash <string>', 'Hash the string')

cmdprogram.parse(process.argv);

methods.encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(text, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
}

methods.decrypt = (text) => {
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    let decryptedData = decipher.update(text, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
}

methods.hash = () => {
    return crypto.pbkdf2Sync(args[1], constants.HASHING_SALT, 1000, 64, 'sha512').toString('hex');
}
try {
    if (cmdprogram.encrypt)
        console.log("Encrypted message: " + methods.encrypt(cmdprogram.encrypt));
    else if (cmdprogram.decrypt)
        console.log("Decrypted message: " + methods.decrypt(cmdprogram.decrypt));
    else if (cmdprogram.hash)
        console.log("Hashed message: " + methods.hash(cmdprogram.hash));
} catch (error) {
    console.log(`Operation failed ${error}`);
}


module.exports = methods;