# AppScan Issue Gateway

The `appscan-issue-gateway-v2` facilitates issue synchronization between AppScan (AppScan on Cloud, AppScan 360°, and AppScan Enterprise) and Jira. This capability enables AppScan users to transfer security issue data to other systems, eliminating the need for custom REST calls and plumbing. This service operates as a REST API, making it suitable for automated scanning workflows where it is invoked for issue processing.

> **SECURITY UPDATE**: This version introduces secure credential storage using the system's native credential managers (Windows Credential Manager, macOS Keychain, or Linux Secret Service API). All sensitive information including AppScan credentials and encryption keys are now stored securely in your system's native credential store. Please update your configuration to use the new secure credential management system.

## Prerequisites
The following prerequisites are required:

1. Node.js runtime version 22.14.0 or later
2. A relevant AppScan product:
   - HCL AppScan Enterprise version 10.x or later
   - AppScan on Cloud
   - AppScan 360° version 1.3 or later
3. A supported Issue Management system: Jira

## Installation Steps

To install the application, complete the following steps:

1. Download or clone the code from the repository.
2. To install all required npm libraries:
   - From the home directory, open the command prompt.
   - Run the command:  
     `npm install`
3. Edit the [`.env`](.env ) file in the home directory by renaming [`.env.temp`](.env.temp ) to [`.env`](.env ) and configure the following properties:
   - `APPSCAN_URL`: The URL of AppScan Enterprise, AppScan on Cloud, or AppScan 360°
   - `APPSCAN_PROVIDER`: AppScan on Cloud, AppScan 360°, or AppScan Enterprise
   
   Note: The `keyId` and `keySecret` are no longer stored in the .env file. They are now managed using the secure credential system.
   - `APPSCAN_TIMEZONE` : Your local time zone (for example, by default, keep it 00:00)
   - `SECURE_PORT`: The port the gateway application listens to
   - `SSL_PFX_CERT_FILE`: The path to the certificate in PFX forma
   - `SSL_PFX_CERT_PASSPHRASE`: The certificate passphrase or password
   - `NODE_TLS_REJECT_UNAUTHORIZED`: Set to 1 if you have valid certificates for AppScan Enterprise or AppScan 360° (see "Notes," item 4)
   - `LOCAL_ADMIN_USER`: The only user who can log in to the Issue Gateway
   - `ADMIN_USER_PASSWORD`: The hashed password of the Issue Gateway user. To hash the password, run the command `node cryptoService.js --hash <password>` from the root directory
   - `APP_LOG`: The path and name of the log file
   - `MAXLOGSIZE`: The maximum size of the log file
   - `NUMBER_OF_BACKUPS`: The number of backups
   - `IM_PROVIDER`: The provider name (for example, JIRA)
   - `GENERATE_HTML_FILE_JIRA`: Set to 'true' to attach reports in Jira
   - `GENERATE_SCAN_HTML_FILE_JIRA`: Set to 'true' to create a separate ticket for scans.
   - `IMPORT_ISSUES_TO_IM_SYNC_INTERVAL`: Starts the synchronization thread to push data from AppScan to the Issue Management System. A value of `1` means the synchronizer runs every day to push issues identified the previous day. A value of `2` means that the synchronizer runs once every two days to push issues identified in the last two days.
   - `IM_TO_APPSCAN_STATUS_SYNC_INTERVAL`: A bidirectional feature to update the issue status in AppScan from Jira. The synchronization interval can be in minutes, hours, or days (for example, `1d` for daily, `10m` for every 10 minutes, `1h` for hourly).
   - `APPSCAN_TO_IM_STATUS_SYNC_INTERVAL`: A feature to update issue status in Jira from AppScan. The synchronization interval can be in minutes, hours, or days (for example, `1d` for daily, `10m` for every 10 minutes, `1h` for hourly). (see "Notes," item 1)

4. Rename [`config/JIRA.json.temp`](config/JIRA.json.temp ) to [`config/JIRA.json`](config/JIRA.json ) and configure the following properties:
   - `maxissues`: The maximum number of issues to process in this job
   - `imSummary`: The summary of the Jira ticket. You can also include AppScan's issue response attribute—for example, "Security issue found in %ApplicationName%",". Here, %ApplicationName% will be picked dynamically.
   - `issuestates`: The specific issue states to focus on
   - `issueseverities`: The specific issue severities to focus on
   - `imurl`: URL of your Jira instance
   - `imUserName`: The Jira username for running the job
   - `imPassword`: The password for the corresponding Jira user
   - `imissuetype`: The Jira issue type (for example, task, bug, epic)
   - `severityPriorityMap`: A map AppScan severity to Jira ticket priority. (see "Notes," item 2)
  - `attributeMappings`: Use this mapping to create Jira tickets with attributes mapped from AppScan attributes.
      -  ```json{
            "imAttrId": "<This is an attribute id from the IM>",
            "imAttrName:"<The name of the attribute from the IM>"
            "defaultAttrValue": "<If you want to have a hardcoded value for an IM attribute then you use this field>",
            "appScanAttr": "<This is an attribute name from AppScan>",
            "type": "<Type of Jira attribute. Currently we support following types: String, Array, Dropdown, DateTime>"}
            ```
  - `jiraToAppScanStatusMapping`: Use this mapping to update the issue status in AppScan when an issue in Jira changes to a specific status. For example:
      - `"Closed": "Fixed"`: This will update the issue status in AppScan to Fixed when the corresponding ticket in Jira changes to Closed.

- `appScanToJiraStatusMapping`: Use this mapping to update the issue status in Jira when an issue in AppScan changes to a specific status. For example:
  - `"Noise":"False Positive"`: This will update the issue status in Jira to False Positive when the corresponding ticket in AppScan changes to Noise. (See "Notes," item 3.)

- `jiraStatusIdMapping`: Map Jira status names to their corresponding status IDs.

5. Rename [`config/projectKey.json.temp`](config/projectKey.json.temp ) to [`config/projectKey.json`](config/projectKey.json ) and map the AppScan application ID to the Jira project key as required.
6. Rename [`config/projectScanKey.json.temp`](config/projectScanKey.json.temp ) to [`config/projectScanKey.json`](config/projectScanKey.json )  and map the AppScan application ID to the Jira project key as required.

## Running the Application

### Local Development
To start the application in development mode with auto-reload:
```bash
npm start
```

### Installation as Service Locally
To run the application directly in production mode:
```bash
npm run start:prod
```

You can also use process managers like PM2, forever, or systemd to run the application as a service. Below is an example using PM2.

### Running as a Background Service with PM2

#### Installing PM2
```bash
npm install -g pm2
```

#### Starting the Application
```bash
pm2 start server.js --name IssueGateway2 --node-args="--openssl-legacy-provider"
```

#### Managing the Service
```bash
pm2 stop IssueGateway2       # Stop the service
pm2 restart IssueGateway2    # Restart the service
pm2 delete IssueGateway2     # Remove the service
pm2 logs IssueGateway2       # View logs
pm2 status                   # Check status
```

#### Auto-Start on System Boot
```bash
pm2 startup                  # Generate startup script
pm2 save                     # Save current configuration
```

For more information, visit the [PM2 documentation](https://pm2.keymetrics.io/docs/usage/quick-start/).

## Accessing the Application

Access the API's Swagger page using the URL `https://<hostname>:<port>/api/swagger`. The URL is also displayed in the logs.

Use the API to provide Issue Management details and start the synchronizer, or edit the configuration files in the `config/` directory.

## Secure Credential Management
The application uses your system's native credential managers to securely store sensitive information:
- Windows: Windows Credential Manager
- macOS: Keychain
- Linux: Secret Service API/libsecret (requires `libsecret` and `gnome-keyring`)

### Available Commands

#### Managing AppScan Credentials
```bash
# Set AppScan credentials
npm run credentials set <keyId> <keySecret>

# Example:
npm run credentials set "a2aa7331-eff1-366d-503d-c6bf40f7461c" "tMKItIoc2BrIRisBQQVHhKxrqSnoHYo4HaVhFc0PLkPS"

# Verify credentials are stored correctly
npm run credentials verify

# Remove stored credentials
npm run credentials remove
```

#### Managing Security Key (Optional)
The security key is used for encryption/decryption operations. By default, a built-in key (`Exchange6547wordP22swordExc$$nge`) is used, but you can set your own for enhanced security.

```bash
# Set a custom security key
npm run credentials set security-key <key>

# Example (using a strong security key):
npm run credentials set security-key "MyCustomSecureKey123!@#"

# View current security key
npm run credentials get security-key

# Remove custom security key (reverts to default)
npm run credentials remove security-key

# Verify security key configuration
npm run credentials verify security-key
```

#### Combined Command
You can set both AppScan credentials and security key in one command:
```bash
npm run credentials set <keyId> <keySecret> <securityKey>

# Example:
npm run credentials set "a2aa7331-eff1-366d-503d-c6bf40f7461c" "tMKItIoc2BrIRisBQQVHhKxrqSnoHYo4HaVhFc0PLkPS" "MyCustomSecureKey123!@#"
```

Note: The key values shown in the examples are for illustration purposes only. Replace them with your actual AppScan credentials and a secure custom key.

## Known Issues
AppScan Issue Gateway has the following limitations:
- Bidirectional functionality is currently not available for personal scans.
- The synchronization of issues imported through external scanners in AppScan Enterprise is currently not supported.


## Notes
1. Issues will always be created in the default state (To Do) and then transit to the target state based on `appScanToJiraStatusMapping` in the next `APPSCAN_TO_IM_STATUS_SYNC_INTERVAL` job run. For example, if an issue during the import was Noise in AppScan, then the issue will be created in Jira as Open, and then based on the mapping configured in `appScanToJiraStatusMapping`, the issue status will transition to the target state in the next job run.
2. If no mapping is present in the `Jira.Json` file for the key `severityPriorityMap`, then the priority of the ticket created will be `Medium` by default.
3. A cyclic dependency means that a status in AppScan maps to a status in Jira, and that status in Jira maps back to the original status in AppScan, or vice versa. In `appScanToJiraStatusMapping` and `jiraToAppScanStatusMapping`, you can configure the status to synchronize between AppScan and Jira. However, you cannot specify the same status in both the mappings; doing so will cause a validation error.
4. If you get certificate-related errors, verify that you have valid certificates.

## License

All files in this project are licensed under the Apache License 2.0.
