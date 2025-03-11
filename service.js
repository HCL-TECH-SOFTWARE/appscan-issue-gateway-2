var service = require('node-windows').Service;
const fs = require('fs');
var path = require('path');
const appFilePath = path.resolve(path.join(__dirname, 'server.js'));
var cmdprogram = require('commander');
const serviceName = "IssueGateway2";

var issueGatewayService = new service({
    name: 'IssueGateway2',
    description: 'Interface to integrate SailPoint and AppScan',
    script: appFilePath,
    nodeOptions: [
        '--openssl-legacy-provider'
    ]
});

issueGatewayService._directory =  path.resolve();

cmdprogram
    .option('--install', 'Install the service')
    .option('--uninstall','Stop and uninstall the service')

cmdprogram.parse(process.argv);

if(cmdprogram.uninstall) {
    if (!verifyServiceInstalled())
        return console.log('The %s service is not installed.', serviceName);
    
    console.log('Uninstalling the %s service...', serviceName);
    issueGatewayService.uninstall();    
}
else if(cmdprogram.install) {
    if (verifyServiceInstalled())
        return console.log('The %s service is already installed', serviceName);

    console.log('Installing the service %s ', serviceName);
    issueGatewayService.install();
}
else 
    return cmdprogram.help();


function verifyServiceInstalled() {
    var execSync = require("child_process").execSync;

    try {
        var stdout = execSync('sc query '+serviceName+'.exe');
        var output = stdout.toString();
        if(output.includes(serviceName)){
            return true;
        }
    } catch (error) {
    }
    return false;
}

///////////////////////////////////////////////////////////
//////////////   Service Events ////////////////
///////////////////////////////////////////////////////////

// Listen for the "install" event, which indicates the
// process is available as a service.
issueGatewayService.on('install', function () {
    if(verifyServiceInstalled())
        return console.log('The service %s is installed.', serviceName);
});

// Listen for the "uninstall" event, to uninstall service
issueGatewayService.on('uninstall', function () {
    if(!verifyServiceInstalled()) 
        return console.log('The service %s is uninstalled.', serviceName);
});

// Listen for the "uninstall" event, to uninstall service
issueGatewayService.on('error', function () {
    return console.log('Failed to install the service - ' + error);
});