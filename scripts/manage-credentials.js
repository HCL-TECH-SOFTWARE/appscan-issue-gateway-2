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

const credentialService = require('../src/utils/credentialService');
const aseAuthService = require('../src/ase/service/authService');
const asocAuthService = require('../src/asoc/service/authService');
const log4js = require("log4js");
const logger = log4js.getLogger("manage-credentials");
require('dotenv').config();

async function main() {
    const command = process.argv[2];
    const subCommand = process.argv[3];
    
    switch (command) {
        case 'set':
            if (subCommand === 'security-key') {
                const securityKey = process.argv[4];
                if (!securityKey) {
                    console.error('Usage: node manage-credentials.js set security-key <key>');
                    process.exit(1);
                }
                try {
                    await credentialService.saveSecurityKey(securityKey);
                    console.log('Security key has been securely stored.');
                } catch (error) {
                    console.error('Failed to store security key:', error.message);
                    process.exit(1);
                }
            } else {
                const keyId = process.argv[3];
                const keySecret = process.argv[4];
                const securityKey = process.argv[5];
                
                if (!keyId || !keySecret) {
                    console.error('Usage: node manage-credentials.js set <keyId> <keySecret> [securityKey]');
                    process.exit(1);
                }
                
                try {
                    // First verify the credentials work by trying to log in
                    const inputData = { keyId, keySecret };
                    try {
                        if (!process.env.APPSCAN_PROVIDER) {
                            throw new Error('APPSCAN_PROVIDER environment variable is not set. Please configure it in .env file.');
                        }

                        if (process.env.APPSCAN_PROVIDER === 'ASE') {
                            const result = await aseAuthService.keyLogin(inputData);
                            if (!result.data.sessionId) {
                                throw new Error('Failed to authenticate with AppScan Enterprise');
                            }
                        } else if (process.env.APPSCAN_PROVIDER === 'ASoC' || process.env.APPSCAN_PROVIDER === 'A360') {
                            const result = await asocAuthService.keyLogin(inputData);
                            if (!result.data.Token) {
                                throw new Error('Failed to authenticate with AppScan on Cloud/360');
                            }
                        } else {
                            throw new Error('Invalid APPSCAN_PROVIDER value. Must be ASE, ASoC, or A360');
                        }

                        // If login successful, save the credentials
                        await credentialService.saveKeyId(keyId);
                        await credentialService.saveKeySecret(keySecret);
                        if (securityKey) {
                            await credentialService.saveSecurityKey(securityKey);
                            console.log('Credentials verified and securely stored with custom security key.');
                        } else {
                            console.log('Credentials verified and securely stored.');
                        }
                    } catch (loginError) {
                        throw new Error(`Failed to validate credentials: ${loginError.message}`);
                    }
                } catch (error) {
                    console.error('Failed to store credentials:', error.message);
                    process.exit(1);
                }
            }
            break;
            
        case 'remove':
            if (subCommand === 'security-key') {
                try {
                    await credentialService.deleteSecurityKey();
                    console.log('Security key has been removed from secure storage.');
                } catch (error) {
                    console.error('Failed to remove security key:', error.message);
                    process.exit(1);
                }
            } else {
                try {
                    await credentialService.deleteKeyId();
                    await credentialService.deleteKeySecret();
                    await credentialService.deleteSecurityKey();
                    console.log('Credentials and security key have been removed from secure storage.');
                } catch (error) {
                    console.error('Failed to remove credentials:', error.message);
                    process.exit(1);
                }
            }
            break;
            
        case 'verify':
            try {
                if (subCommand === 'security-key') {
                    const storedSecurityKey = await credentialService.getSecurityKey();
                    if (storedSecurityKey === 'Exchange6547wordP22swordExc$$nge') {
                        console.log('Using default security key. Consider setting a custom one.');
                    } else {
                        console.log('Custom security key is configured.');
                    }
                } else {
                    const storedKeyId = await credentialService.getKeyId();
                    const storedKeySecret = await credentialService.getKeySecret();
                    const storedSecurityKey = await credentialService.getSecurityKey();
                    
                    if (storedKeyId && storedKeySecret) {
                        console.log('Credentials are stored in secure storage. Verifying with AppScan...');
                        
                        // Verify credentials by attempting to log in
                        const inputData = { keyId: storedKeyId, keySecret: storedKeySecret };
                        try {
                            if (!process.env.APPSCAN_PROVIDER) {
                                throw new Error('APPSCAN_PROVIDER environment variable is not set. Please configure it in .env file.');
                            }

                            if (process.env.APPSCAN_PROVIDER === 'ASE') {
                                const result = await aseAuthService.keyLogin(inputData);
                                if (!result.data.sessionId) {
                                    throw new Error('Failed to authenticate with AppScan Enterprise');
                                }
                                console.log('Successfully authenticated with AppScan Enterprise.');
                            } else if (process.env.APPSCAN_PROVIDER === 'ASoC' || process.env.APPSCAN_PROVIDER === 'A360') {
                                const result = await asocAuthService.keyLogin(inputData);
                                if (!result.data.Token) {
                                    throw new Error('Failed to authenticate with AppScan on Cloud/360');
                                }
                                console.log('Successfully authenticated with AppScan on Cloud/360.');
                            } else {
                                throw new Error('Invalid APPSCAN_PROVIDER value. Must be ASE, ASoC, or A360');
                            }

                            if (storedSecurityKey === 'Exchange6547wordP22swordExc$$nge') {
                                console.log('Note: Using default security key. Consider setting a custom one.');
                            } else {
                                console.log('Custom security key is configured.');
                            }
                        } catch (loginError) {
                            console.error('Failed to validate credentials:', loginError.message);
                            process.exit(1);
                        }
                    } else {
                        console.log('Credentials are not fully configured:');
                        if (!storedKeyId) console.log('- KeyId is missing');
                        if (!storedKeySecret) console.log('- KeySecret is missing');
                        process.exit(1);
                    }
                }
            } catch (error) {
                console.error('Failed to verify credentials:', error.message);
                process.exit(1);
            }
            break;
            
        case 'get':
            if (subCommand === 'security-key') {
                try {
                    const storedSecurityKey = await credentialService.getSecurityKey();
                    console.log('Current security key:', storedSecurityKey);
                } catch (error) {
                    console.error('Failed to get security key:', error.message);
                    process.exit(1);
                }
            } else {
                console.log('Invalid command. Use one of the commands below:');
                printUsage();
            }
            break;

        default:
            console.log('Usage:');
            printUsage();
            process.exit(1);
    }
}

function printUsage() {
    console.log('Credential Management:');
    console.log('  Set credentials:');
    console.log('    npm run credentials set <keyId> <keySecret> [securityKey]');
    console.log('  Remove all credentials:');
    console.log('    npm run credentials remove');
    console.log('  Verify all credentials:');
    console.log('    npm run credentials verify');
    console.log('\nSecurity Key Management:');
    console.log('  Set security key:');
    console.log('    npm run credentials set security-key <key>');
    console.log('  Get security key:');
    console.log('    npm run credentials get security-key');
    console.log('  Remove security key:');
    console.log('    npm run credentials remove security-key');
    console.log('  Verify security key:');
    console.log('    npm run credentials verify security-key');
}

main().catch(error => {
    console.error('An unexpected error occurred:', error);
    process.exit(1);
});