# AppScan Issue Gateway

The `appscan-issue-gateway-v2` facilitates synchronization of issues between AppScan (ASoC, A360° & ASE) and Jira. This capability allows AppScan users to push security issue data into other systems, eliminating the need for custom REST calls and plumbing. This service operates as a REST API, making it ideal for automated scanning workflows where it is invoked for issue processing.

## Prerequisites

1. Node.js runtime version >= 18.18.0
2. Relevant AppScan product: 
   - HCL AppScan Enterprise >= v10.x
   - AppScan on Cloud
   - AppScan 360° >= v1.3
3. A supported Issue Management system: Jira

## Installation Steps

1. Download/clone the code from the repository.
2. Open the command prompt from the home directory and run the command `npm install` to install all required npm libraries.
3. Edit the [`.env`](.env ) file (rename [`.env.temp`](.env.temp ) to [`.env`](.env )) in the home directory to configure the following properties:
   - `APPSCAN_URL`: URL of the AppScan Enterprise, ASoC, or A360°
   - `keyId`: AppScan key id
   - `keySecret`: AppScan key secret
   - `APPSCAN_PROVIDER`: ASoC or A360 or ASE
   - `APPSCAN_TIMEZONE` : Add your local time zone i.e. by default keep it 00:00
   - `SECURE_PORT`: Port the Gateway application listens to
   - `SSL_PFX_CERT_FILE`: Path to the certificate in PFX format
   - `SSL_PFX_CERT_PASSPHRASE`: Certificate passphrase/password
   - `NODE_TLS_REJECT_UNAUTHORIZED`: Set it 1 if you have valid certificates for ASE/A360°. (refer notes #4)
   - `LOCAL_ADMIN_USER`: Set the only user who can log in to IGW
   - `ADMIN_USER_PASSWORD`: The hashed password of the IGW user. To hash the password, run the command `node [`cryptoService.js`](cryptoService.js ) --hash <password>` from the base directory
   - `APP_LOG`: Path and name of the log file
   - `MAXLOGSIZE`: Maximum size of the log file
   - `NUMBER_OF_BACKUPS`: Number of backups
   - `IM_PROVIDER`: Provider Name (e.g., JIRA)
   - `GENERATE_HTML_FILE_JIRA`: Set this to 'true' to attach reports in Jira
   - `GENERATE_SCAN_HTML_FILE_JIRA`: set this to 'true' to create a separate ticket for scans.
   - `IMPORT_ISSUES_TO_IM_SYNC_INTERVAL`: Start the sync thread to push data from AppScan to the Issue Management System. `1` means the synchronizer runs every day to push issues identified the previous day. `2` means the synchronizer runs once every 2 days to push issues identified in the last 2 days.
   - `IM_TO_APPSCAN_STATUS_SYNC_INTERVAL`: Bidirectional feature to update the issue status in AppScan From Jira. The sync interval can be in minutes, hours, or days (e.g., `1d` for daily, `10m` for every 10 minutes, `1h` for hourly).
   - `APPSCAN_TO_IM_STATUS_SYNC_INTERVAL`: Feature to update issue status in Jira from AppScan. The sync interval can be in minutes, hours, or days (e.g., `1d` for daily, `10m` for every 10 minutes, `1h` for hourly). (refer notes #1)

4. Rename [`config/JIRA.json.temp`](config/JIRA.json.temp ) to [`config/JIRA.json`](config/JIRA.json ) and configure the following properties:
   - `maxissues`: The maximum number of issues to process in this job
   - `imSummary`: Specify the summary of the jira ticket. You can also include AppScan's issue response attribute e.g. "Security issue found in %ApplicationName%",". Here %ApplicationName% will be picked dynamically.
   - `issuestates`: Specific issue states to focus on
   - `issueseverities`: Specific issue severities to focus on
   - `imurl`: URL of your Jira instance
   - `imUserName`: Jira username for running the job
   - `imPassword`: Password for the corresponding Jira user
   - `imissuetype`: Jira issue type (e.g., task, bug, epic)
   - `severityPriorityMap`: Map AppScan severity to Jira ticket priority. (refer notes #2)
  - `attributeMappings`: Use this maping to create Jira tickets with attributes mapped from AppScan attribute. 
      -  ```json{
            "imAttrId": "<This is an attribute id from the IM>",
            "imAttrName:"<The name of the attribute from the IM>"
            "defaultAttrValue": "<If you want to have a hardcoded value for an IM attribute then you use this field>",
            "appScanAttr": "<This is an attribute name from AppScan>",
            "type": "<Type of Jira attribute. Currently we support following types: String, Array, Dropdown, DateTime>"}
            ```
  - `jiraToAppScanStatusMapping`: Use this mapping to update issue status in AppScan when an issue in Jira changes to a specific status. For example:
      - `"Closed":"Fixed"`: This will update the issue status in AppScan to `Fixed` when the corresponding ticket in Jira changes to `Closed`.

- `appScanToJiraStatusMapping`: Use this mapping to update issue status in Jira when an issue in AppScan changes to a specific status. For example:
  - `"Noise":"False Positive"`: This will update the issue status in Jira to `False Positive` when the corresponding ticket in AppScan changes to `Noise`. (refer notes #3)

- `jiraStatusIdMapping`: Map Jira status names to their corresponding status IDs.

5. Rename [`config/projectKey.json.temp`](config/projectKey.json.temp ) to [`config/projectKey.json`](config/projectKey.json ) and map the AppScan application ID to the Jira Project Key as required.
6. Rename [`config/projectScanKey.json.temp`](config/projectScanKey.json.temp ) to [`config/projectScanKey.json`](config/projectScanKey.json ) and map the AppScan application ID to the Jira Project Key as required.
7. To start the Gateway application locally, run the command `npm start` from the root directory. To install it as a service, refer to the next step.
8. To install/uninstall the application as a Windows Service, run the following commands from the root directory:
   - `node [`service.js`](service.js ) --install`
   - `node [`service.js`](service.js ) --uninstall`
9. Access the API's Swagger page using the URL `https://<hostname>:<port>/api/swagger`. This URL can be found in the console/log.
10. Use the API to provide Issue Management details and start the synchronizer, or edit the file in the config directory.
11. If installing the service fails following step 8, follow these steps:
    - Download the NSSM utility from [NSSM](https://nssm.cc/download)
    - Launch `nssm.exe` from the `win64` folder by running the command `nssm.exe install "HCL Issue Gateway"`

## Known Issues
AppScan Issue Gateway has following limitations:
- Bi-directional functionality is currently not available in case of personal scans.
- Syncing issues imported via external scanners in ASE is currently not supported.


## Notes
1. Issues will always be created in default state (Open) and then transit to target state based on `appScanToJiraStatusMapping` in the next `APPSCAN_TO_IM_STATUS_SYNC_INTERVAL` job run. e.g. If a issue during the import was `Noise` in AppScan then the issue will be created in Jira as `Open` and then based on the mapping configured in `appScanToJiraStatusMapping` the issue status will transit to target state in the next job run.
2. If in the Jira.Json file for the key `severityPriorityMap`, no mapping is present then the priority of the ticket created will be `Medium` by default.
3. A cyclic dependency means that a status in AppScan maps to a status in Jira,
and that status in Jira maps back to the original status in AppScan, or vice versa. In `appScanToJiraStatusMapping` & `jiraToAppScanStatusMapping`, you can configure the status to sync betwen AppScan and Jira. However you can not specify the same status in both the mappings and it will throw validation error.
4. If you get errors related to certificates then please verify if you have valid certificates. 

## License

All files in this project are licensed under the Apache License 2.0.