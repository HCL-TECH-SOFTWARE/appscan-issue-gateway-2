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

const keytar = require('keytar');

const SERVICE_NAME = 'appscan-issue-gateway';
const KEY_ID_ACCOUNT = 'keyId';
const KEY_SECRET_ACCOUNT = 'keySecret';
const SECURITY_KEY_ACCOUNT = 'securityKey';

class CredentialService {
    /**
     * Save the key ID to the system's secure credential store
     * @param {string} keyId - The key ID to store
     * @returns {Promise<void>}
     */
    static async saveKeyId(keyId) {
        await keytar.setPassword(SERVICE_NAME, KEY_ID_ACCOUNT, keyId);
    }

    /**
     * Save the key secret to the system's secure credential store
     * @param {string} keySecret - The key secret to store
     * @returns {Promise<void>}
     */
    static async saveKeySecret(keySecret) {
        await keytar.setPassword(SERVICE_NAME, KEY_SECRET_ACCOUNT, keySecret);
    }

    /**
     * Retrieve the stored key ID from the system's secure credential store
     * @returns {Promise<string|null>} The stored key ID or null if not found
     */
    static async getKeyId() {
        return await keytar.getPassword(SERVICE_NAME, KEY_ID_ACCOUNT);
    }

    /**
     * Retrieve the stored key secret from the system's secure credential store
     * @returns {Promise<string|null>} The stored key secret or null if not found
     */
    static async getKeySecret() {
        return await keytar.getPassword(SERVICE_NAME, KEY_SECRET_ACCOUNT);
    }

    /**
     * Delete the stored key ID from the system's secure credential store
     * @returns {Promise<boolean>}
     */
    static async deleteKeyId() {
        return await keytar.deletePassword(SERVICE_NAME, KEY_ID_ACCOUNT);
    }

    /**
     * Delete the stored key secret from the system's secure credential store
     * @returns {Promise<boolean>}
     */
    static async deleteKeySecret() {
        return await keytar.deletePassword(SERVICE_NAME, KEY_SECRET_ACCOUNT);
    }

    /**
     * Save the security key to the system's secure credential store
     * @param {string} securityKey - The security key to store
     * @returns {Promise<void>}
     */
    static async saveSecurityKey(securityKey) {
        await keytar.setPassword(SERVICE_NAME, SECURITY_KEY_ACCOUNT, securityKey);
    }

    /**
     * Retrieve the stored security key from the system's secure credential store
     * @returns {Promise<string|null>} The stored security key or null if not found
     */
    static async getSecurityKey() {
        const key = await keytar.getPassword(SERVICE_NAME, SECURITY_KEY_ACCOUNT);
        // If no key is stored, return the default key for backward compatibility
        return key || 'Exchange6547wordP22swordExc$$nge';
    }

    /**
     * Delete the stored security key from the system's secure credential store
     * @returns {Promise<boolean>}
     */
    static async deleteSecurityKey() {
        return await keytar.deletePassword(SERVICE_NAME, SECURITY_KEY_ACCOUNT);
    }
}

module.exports = CredentialService;