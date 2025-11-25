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

const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

const command = process.argv[2];
const appName = 'IssueGateway2';
const appRoot = path.join(__dirname, '..');

function checkPm2() {
  try {
    execSync('pm2 -v', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function runCommand(cmd, description) {
  try {
    console.log(`${description}...`);
    execSync(cmd, { stdio: 'inherit', cwd: appRoot });
    return true;
  } catch (err) {
    console.error(`Error: ${description} failed.`);
    return false;
  }
}

function printUsage() {
  console.log('\nUsage: node pm2-manager.js <command>\n');
  console.log('Commands:');
  console.log('  start      - Start the application');
  console.log('  stop       - Stop the application');
  console.log('  restart    - Restart the application');
  console.log('  logs       - View application logs');
  console.log('  status     - Show application status');
  console.log('  uninstall  - Remove PM2 startup (if configured)\n');
  console.log('  help       - Show this help message\n');
  console.log('Examples:');
  console.log('  npm run pm2:start      # Start the application');
  console.log('  npm run pm2:stop       # Stop the application');
  console.log('  npm run pm2:uninstall  # Remove the PM2 process entry');
}

function main() {
  if (!checkPm2()) {
    console.error('❌ PM2 is not installed globally.');
    console.error('Please run: npm run pm2:setup\n');
    process.exit(1);
  }

  switch (command) {
    case 'help':
      printUsage();
      process.exit(0);
      break;
    case 'start':
      if (!runCommand(`pm2 start ${path.join(appRoot, 'ecosystem.config.js')}`, '🚀 Starting application')) {
        process.exit(1);
      }
      console.log('\n✅ Application started successfully.\n');
      break;

    case 'stop':
      if (!runCommand(`pm2 stop ${appName}`, '⏹️  Stopping application')) {
        process.exit(1);
      }
      console.log('\n✅ Application stopped successfully.\n');
      break;

    case 'restart':
      if (!runCommand(`pm2 restart ${appName}`, '🔄 Restarting application')) {
        process.exit(1);
      }
      console.log('\n✅ Application restarted successfully.\n');
      break;

    case 'logs':
      try {
        console.log('\n📜 Application Logs:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        execSync(`pm2 logs ${appName} --lines 100`, { stdio: 'inherit' });
      } catch (err) {
        // Ignore errors as logs command streams output
      }
      break;

    case 'status':
      try {
        console.log('\n📋 Application Status:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        execSync('pm2 list', { stdio: 'inherit' });
        console.log('\n');
      } catch (err) {
        console.error('Failed to get status.');
        process.exit(1);
      }
      break;

    case 'uninstall':
      try {
        console.log('\n🔎 Removing PM2 process...\n');
        execSync(`pm2 delete ${appName}`, { stdio: 'inherit', cwd: appRoot });
        console.log('\n✅ PM2 process removed (if it existed).\n');
      } catch (err) {
        console.log('\n⚠️  Could not delete PM2 process using `pm2 delete`.');
        console.log(`Error: ${err && err.message ? err.message : 'unknown'}`);
        console.log('\nIf you also configured PM2 to start on system boot, remove the startup entry manually for your platform (for example `pm2 unstartup` on Linux/macOS or remove the Windows service with `sc delete <service-name>` on Windows).\n');
      }
      break;

    default:
      console.error(`❌ Unknown command: ${command}\n`);
      printUsage();
      process.exit(1);
  }
}

main();
