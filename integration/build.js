var project = require('../project.config');
var fsExtra = require('fs-extra');
require('console-info');
require('console-error');

function removeAllFiles(){
    try {
    	fsExtra.removeSync(project.build.remoteClientPath);
        fsExtra.removeSync(project.build.remoteServerPath);
    	console.info(`Removing build files success: ${project.common.remotePath}`);
    } catch(err) {
        return console.error(err);
    }
}

function copyServerFiles(){
    fsExtra.copy(project.build.localServerPath, project.build.remoteServerPath, function(err) {
        if (err) {
            return console.error(err);
        }
        console.info(`Copying server build files success: ${project.build.remoteServerPath}`);
    });
}

module.exports = {
    removeAllFiles: removeAllFiles,
    copyServerFiles: copyServerFiles
}
