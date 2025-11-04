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
const credentialService = require('./src/utils/credentialService');

const algorithm = "aes-256-cbc";
let initVector = 'b364e6196d8db737';
var methods = {};

cmdprogram
    .option('--encrypt <string>', 'Encrypt the string')
    .option('--decrypt <string>', 'Decrypt the string')
    .option('--hash <string>', 'Hash the string')
    .option('--set-security-key <string>', 'Set a new security key')
    .option('--get-security-key', 'Get the current security key')
    .option('--delete-security-key', 'Delete the stored security key')

cmdprogram.parse(process.argv);

methods.encrypt = async (text) => {
    const securityKey = await credentialService.getSecurityKey();
    const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);
    let encryptedData = cipher.update(text, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
}

methods.decrypt = async (text) => {
    const securityKey = await credentialService.getSecurityKey();
    const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
    let decryptedData = decipher.update(text, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
}

methods.hash = () => {
    return crypto.pbkdf2Sync(args[1], constants.HASHING_SALT, 1000, 64, 'sha512').toString('hex');
}
async function main() {
    try {
        if (cmdprogram.setSecurityKey) {
            await credentialService.saveSecurityKey(cmdprogram.setSecurityKey);
            console.log("Security key has been securely stored");
        }
        else if (cmdprogram.getSecurityKey) {
            const key = await credentialService.getSecurityKey();
            console.log("Current security key:", key);
        }
        else if (cmdprogram.deleteSecurityKey) {
            await credentialService.deleteSecurityKey();
            console.log("Security key has been deleted");
        }
        else if (cmdprogram.encrypt)
            console.log("Encrypted message: " + await methods.encrypt(cmdprogram.encrypt));
        else if (cmdprogram.decrypt)
            console.log("Decrypted message: " + await methods.decrypt(cmdprogram.decrypt));
        else if (cmdprogram.hash)
            console.log("Hashed message: " + methods.hash(cmdprogram.hash));
        else {
            console.log("Usage:");
            console.log("  Set security key:    node cryptoService.js --set-security-key <key>");
            console.log("  Get security key:    node cryptoService.js --get-security-key");
            console.log("  Delete security key: node cryptoService.js --delete-security-key");
            console.log("  Encrypt:             node cryptoService.js --encrypt <text>");
            console.log("  Decrypt:             node cryptoService.js --decrypt <text>");
            console.log("  Hash:                node cryptoService.js --hash <text>");
        }
    } catch (error) {
        console.log(`Operation failed: ${error.message}`);
    }
}

main();


module.exports = methods;