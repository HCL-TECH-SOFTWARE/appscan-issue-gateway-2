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

'use strict';

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Extracts the plain text that ends up inside the ADF code-block created by
 * toADF(), which is the second-level content text node.
 */
function descriptionText(adfObject) {
    return adfObject.content[0].content[0].text;
}

// ── Module under test ────────────────────────────────────────────────────────
// We load jiraService in each test after setting APPSCAN_PROVIDER so that the
// module-level env check in the helpers picks up the right value.

afterEach(() => {
    jest.resetModules();
    delete process.env.APPSCAN_PROVIDER;
});

// ── Fix 2: HTML entity decoding in Jira descriptions ─────────────────────────

describe('decodeIssueValues (exported helper)', () => {
    beforeEach(() => {
        process.env.APPSCAN_PROVIDER = 'ASE';
    });

    test('decodes HTML entities in a flat string value', () => {
        jest.resetModules();
        const { decodeIssueValues } = require('../src/igw/services/jiraService');
        const input = { Name: 'Missing &#34;Referrer policy&#34; Security Header' };
        const decoded = decodeIssueValues(input);
        expect(decoded.Name).toBe('Missing "Referrer policy" Security Header');
    });

    test('decodes HTML entities in nested objects', () => {
        jest.resetModules();
        const { decodeIssueValues } = require('../src/igw/services/jiraService');
        const input = { outer: { inner: 'A &#38; B' } };
        const decoded = decodeIssueValues(input);
        expect(decoded.outer.inner).toBe('A & B');
    });

    test('decodes HTML entities inside array elements', () => {
        jest.resetModules();
        const { decodeIssueValues } = require('../src/igw/services/jiraService');
        const input = { tags: ['tag&#34;one', 'tag&#34;two'] };
        const decoded = decodeIssueValues(input);
        expect(decoded.tags).toEqual(['"one', '"two'].map((s, i) => `tag${s}`));
        expect(decoded.tags[0]).toBe('tag"one');
        expect(decoded.tags[1]).toBe('tag"two');
    });

    test('leaves non-string primitives unchanged', () => {
        jest.resetModules();
        const { decodeIssueValues } = require('../src/igw/services/jiraService');
        const input = { count: 42, active: true, nothing: null };
        const decoded = decodeIssueValues(input);
        expect(decoded.count).toBe(42);
        expect(decoded.active).toBe(true);
        expect(decoded.nothing).toBeNull();
    });
});

// ── Fix 3: Logger emitted immediately on Jira issue creation ─────────────────

describe('createTickets – logging on successful creation', () => {
    let loggerInfoSpy;

    beforeEach(() => {
        jest.resetModules();

        // Stub log4js so we can capture logger.info calls
        jest.mock('log4js', () => ({
            getLogger: () => ({
                info: jest.fn(),
                error: jest.fn(),
                warn: jest.fn(),
            }),
        }));

        // Stub util.httpImCall to simulate a 201 Created response
        jest.mock('../../src/utils/util', () => ({
            httpImCall: jest.fn().mockResolvedValue({
                code: 201,
                data: { key: 'TEST-42' },
            }),
        }));

        // Stub modules with network / crypto side-effects
        jest.mock('../../src/asoc/service/authService', () => ({}));
        jest.mock('../../../cryptoService', () => ({}), { virtual: true });
    });

    test('calls logger.info with the created issue key', async () => {
        const log4js = require('log4js');
        const mockLogger = log4js.getLogger();
        loggerInfoSpy = mockLogger.info;

        const jiraService = require('../src/igw/services/jiraService');

        // Patch createJiraIssueProperty so it doesn't make real HTTP calls
        jiraService.createJiraIssueProperty = jest.fn().mockResolvedValue({});

        const imConfigObject = {
            imurl: 'https://jira.example.com',
            imUserName: 'user',
            imPassword: 'pass',
            improjectkey: { default: 'PROJ' },
            imissuetype: 'Bug',
            imSummary: '%Name%',
            attributeMappings: [],
            severityPriorityMap: {},
        };

        process.env.APPSCAN_PROVIDER = 'ASoC';

        await jiraService.createTickets(
            [{ Id: 'issue-1', Name: 'XSS', Severity: 'High' }],
            imConfigObject,
            'app-1',
            'MyApp'
        );

        const loggedMessages = loggerInfoSpy.mock.calls.map(c => c[0]);
        expect(loggedMessages.some(m => m.includes('Jira issue created: TEST-42'))).toBe(true);
    });
});

describe('createScanTickets – logging on successful creation', () => {
    beforeEach(() => {
        jest.resetModules();

        jest.mock('log4js', () => ({
            getLogger: () => ({
                info: jest.fn(),
                error: jest.fn(),
                warn: jest.fn(),
            }),
        }));

        jest.mock('../../src/utils/util', () => ({
            httpImCall: jest.fn().mockResolvedValue({
                code: 201,
                data: { key: 'SCAN-7' },
            }),
        }));

        jest.mock('../../src/asoc/service/authService', () => ({}));
        jest.mock('../../../cryptoService', () => ({}), { virtual: true });
    });

    test('calls logger.info with the created scan-ticket issue key', async () => {
        const log4js = require('log4js');
        const mockLogger = log4js.getLogger();

        const jiraService = require('../src/igw/services/jiraService');

        const imConfigObject = {
            imurl: 'https://jira.example.com',
            imUserName: 'user',
            imPassword: 'pass',
            improjectkey: { default: 'PROJ' },
            imissuetype: 'Task',
            imSummary: '%Name%',
            improjectscanKey: { default: 'PROJ' },
            attributeMappings: [],
            severityPriorityMap: {},
        };

        process.env.APPSCAN_PROVIDER = 'ASoC';

        await jiraService.createScanTickets(
            [{ Name: 'DAST Scan', Technology: 'DynamicAnalyzer' }],
            imConfigObject,
            'app-1',
            'MyApp',
            'scan-999',
            'DynamicAnalyzer'
        );

        const loggedMessages = mockLogger.info.mock.calls.map(c => c[0]);
        expect(loggedMessages.some(m => m.includes('Jira issue created: SCAN-7'))).toBe(true);
    });
});
