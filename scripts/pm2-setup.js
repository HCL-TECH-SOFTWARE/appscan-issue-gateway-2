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
const fs = require('fs');
const path = require('path');
const os = require('os');

const log = console.log;
const error = console.error;

function printBanner() {
  log('\n╔════════════════════════════════════════════════════════════╗');
  log('║   HCL AppScan Issue Gateway - PM2 Setup                    ║');
  log('╚════════════════════════════════════════════════════════════╝\n');
}

function checkNodeModules() {
  const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    error('❌ Error: node_modules not found.');
    error('Please run "npm install" first.\n');
    process.exit(1);
  }
}

function checkPm2Global() {
  try {
    execSync('pm2 -v', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function installPm2Global() {
  log('📦 Installing PM2 globally...');
  try {
    execSync('npm install -g pm2', { stdio: 'inherit' });
    log('✅ PM2 installed successfully.\n');
  } catch (err) {
    error('❌ Failed to install PM2 globally.');
    error('Please run: npm install -g pm2\n');
    process.exit(1);
  }
}

function setupPm2() {
  const appRoot = path.join(__dirname, '..');
  
  try {
    log('🚀 Starting the application with PM2...');
    
    // Start the application using ecosystem.config.js
    execSync(`pm2 start ${path.join(appRoot, 'ecosystem.config.js')}`, {
      stdio: 'inherit',
      cwd: appRoot
    });
    
    log('\n✅ Application started successfully with PM2.\n');
    
    // Save PM2 configuration
    log('💾 Saving PM2 process list...');
    try {
      execSync('pm2 save', { stdio: 'inherit' });
      log('✅ PM2 process list saved.\n');
    } catch (err) {
      log('⚠️  Could not save PM2 process list. It may not restart on system reboot.\n');
    }
    
    // Display application info
    log('📋 Application Status:');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    try {
      execSync('pm2 list', { stdio: 'inherit' });
    } catch (err) {
      // Ignore errors
    }
    
    log('\n📖 Useful Commands:');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    log('  npm run pm2:status   - Show application status');
    log('  npm run pm2:logs     - View application logs');
    log('  npm run pm2:restart  - Restart the application');
    log('  npm run pm2:stop     - Stop the application');
    log('  npm run pm2:start    - Start the application');
    log('  npm run pm2:uninstall - Remove PM2 startup (if configured)\n');
    
  } catch (err) {
    error('❌ Failed to start application with PM2.');
    error(`Error: ${err.message}\n`);
    process.exit(1);
  }
}

function setupStartup() {
  log('🔧 Setup PM2 to start on system boot? (requires admin privileges)');
  log('   You can skip this and run it later with: pm2 startup\n');
  
  const isWindows = os.platform() === 'win32';
  if (isWindows) {
    log('⚠️  Note: On Windows, PM2 startup requires admin privileges.');
    log('   If you skip this, the application will not restart on system reboot.\n');
  }
}

async function main() {
  printBanner();
  
  checkNodeModules();
  
  log('✓ Checking PM2 installation...\n');
  
  if (!checkPm2Global()) {
    installPm2Global();
  } else {
    log('✅ PM2 is already installed.\n');
  }
  
  setupPm2();
  setupStartup();
  
  log('╔════════════════════════════════════════════════════════════╗');
  log('║   Setup Complete!                                          ║');
  log('║   Your application is now running with PM2.                ║');
  log('╚════════════════════════════════════════════════════════════╝\n');
}

main().catch(err => {
  error('❌ An unexpected error occurred:');
  error(err.message);
  process.exit(1);
});
