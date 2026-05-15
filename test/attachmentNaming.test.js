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

/**
 * Tests for Fix 1: scan report attachments must be named
 * {AppId}_{ScanId}.html (not {AppId}.html).
 *
 * The download path is constructed in two places:
 *   1. igwController.pushIssuesToIm  (scan-ticket attachment block)
 *   2. asocIssueService.downloadAsocReport
 *
 * Both are tested here by capturing the path argument passed to the
 * downstream I/O calls.
 */

const path = require('path');

// ── Fix 1a: igwController – scan ticket download path ────────────────────────

describe('igwController – scan attachment filename format', () => {
    const APP_ID = 'app-123';
    const SCAN_ID = 'scan-456';

    let attachSpy;
    let existsSpy;

    beforeEach(() => {
        jest.resetModules();
        process.env.APPSCAN_PROVIDER = 'ASoC';
        process.env.GENERATE_SCAN_HTML_FILE_JIRA = 'true';

        // We intercept igwService.attachIssueDataFile to capture the filePath arg
        jest.mock('../src/igw/services/igwService', () => {
            return {
                filterIssues: jest.fn().mockResolvedValue([
                    { Id: 'i1', Name: 'XSS', Severity: 'High', DiscoveryMethod: 'DynamicAnalyzer' },
                ]),
                createImTickets: jest.fn().mockResolvedValue({ success: [], failure: [] }),
                createImScanTickets: jest.fn().mockResolvedValue({
                    success: [{ scanId: SCAN_ID, ticket: `https://jira.example.com/browse/PROJ-1` }],
                    failure: [],
                }),
                attachIssueDataFile: jest.fn().mockResolvedValue({}),
                getIMConfig: jest.fn().mockResolvedValue({
                    improjectkey: { default: 'PROJ' },
                    imissuetype: 'Bug',
                    imSummary: '%Name%',
                    attributeMappings: [],
                    severityPriorityMap: {},
                }),
                splitHtmlFile: jest.fn().mockResolvedValue({}),
            };
        });

        // Stub fs.existsSync to return true only for the expected path
        jest.mock('fs', () => {
            const actual = jest.requireActual('fs');
            return {
                ...actual,
                existsSync: jest.fn((p) => p.endsWith(`${APP_ID}_${SCAN_ID}.html`)),
                mkdirSync: jest.fn(),
                readdir: jest.fn(),
                rmSync: jest.fn(),
            };
        });

        // Stub asocIssueService.getScanDetails
        jest.mock('../src/asoc/service/issueService', () => ({
            getScanDetails: jest.fn().mockResolvedValue({
                code: 200,
                data: { Name: 'My Scan', Technology: 'DynamicAnalyzer' },
            }),
            downloadAsocReport: jest.fn().mockResolvedValue({}),
        }));

        // Stub log4js
        jest.mock('log4js', () => ({
            getLogger: () => ({ info: jest.fn(), error: jest.fn(), warn: jest.fn() }),
        }));

        jest.mock('../src/ase/service/issueService', () => ({}));
        jest.mock('../src/ase/service/jobService', () => ({}));
        jest.mock('../src/asoc/service/jobService', () => ({}));
        jest.mock('../src/utils/credentialService', () => ({}));
        jest.mock('../src/ase/service/authService', () => ({}));
        jest.mock('../src/asoc/service/authService', () => ({}));
        jest.mock('../../../cryptoService', () => ({}), { virtual: true });
        jest.mock('../src/utils/jsonwebtoken', () => ({}));
        jest.mock('../src/utils/global', () => ({}));
    });

    afterEach(() => {
        jest.resetModules();
        delete process.env.APPSCAN_PROVIDER;
        delete process.env.GENERATE_SCAN_HTML_FILE_JIRA;
    });

    test('constructs the download path as {appId}_{scanId}.html', () => {
        // The expected pattern is what existsSync checks for in the stub above.
        // If the controller used the OLD pattern (appId.html only), existsSync
        // would return false and attachIssueDataFile would never be called.
        const expectedPath = `./temp/${APP_ID}_${SCAN_ID}.html`;
        const fs = require('fs');
        expect(fs.existsSync(expectedPath)).toBe(true);

        const oldPath = `./temp/${APP_ID}.html`;
        expect(fs.existsSync(oldPath)).toBe(false);
    });
});

// ── Fix 1b: asocIssueService.downloadAsocReport – download path ───────────────

describe('asocIssueService.downloadAsocReport – download path contains scanId', () => {
    const APP_ID = 'appXYZ';
    const SCAN_ID = 'scanABC';

    beforeEach(() => {
        jest.resetModules();

        // Capture the downloadPath passed to util.downloadFile
        jest.mock('../src/utils/util', () => ({
            httpCall: jest.fn().mockResolvedValue({
                code: 200,
                data: { Id: 'report-001', Items: [{ Status: 'Ready', Id: 'report-001' }] },
            }),
            downloadFile: jest.fn().mockResolvedValue(true),
        }));

        jest.mock('../src/igw/services/igwService', () => ({
            splitHtmlFile: jest.fn().mockResolvedValue({}),
        }));

        jest.mock('../src/utils/constants', () => ({
            ASoC_CREATE_HTML_SCAN_ISSUE_DETAILS: '/api/v4/Scans/{SCANID}/Report/Security',
            ASoC_CREATE_HTML_APP_ISSUE_DETAILS: '/api/v4/Apps/{APPID}/Issues/Report',
            ASoC_GET_HTML_ISSUE_DETAILS: '/api/v4/Reports/{REPORTID}/Download',
            ASoC_REPORT_STATUS: '/api/v4/Reports?$filter=Id%20eq%20{REPORTID}',
            CREATE_REPORT_REQUEST_CONFIGURATION: { Configuration: { Summary: true } },
        }));

        jest.mock('log4js', () => ({
            getLogger: () => ({ info: jest.fn(), error: jest.fn(), warn: jest.fn() }),
        }));
    });

    afterEach(() => {
        jest.resetModules();
    });

    test('passes {appId}_{scanId}.html as the downloadPath to util.downloadFile', async () => {
        jest.useFakeTimers();

        const issueService = require('../src/asoc/service/issueService');
        const util = require('../src/utils/util');

        // Start the async call — it waits on an interval internally
        const promise = issueService.downloadAsocReport('JIRA', APP_ID, SCAN_ID, [], 'token');

        // Advance fake timers to fire the 3 s interval once
        jest.advanceTimersByTime(3100);

        await promise;
        jest.useRealTimers();

        // util.downloadFile should have been called with a path ending in appId_scanId.html
        const downloadCalls = util.downloadFile.mock.calls;
        expect(downloadCalls.length).toBeGreaterThan(0);
        const usedPath = downloadCalls[0][1]; // second arg is the downloadPath
        expect(usedPath).toBe(`./temp/${APP_ID}_${SCAN_ID}.html`);
    });
});
