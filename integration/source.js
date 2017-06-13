var project = require('../project.config');
var fsExtra = require('fs-extra');
var fs = require('fs');
var path = require('path');
var mm = require('micromatch');
require('console-info');
require('console-error');

function removeFiles(cb){
    var rPath = project.source.remoteSourcePath;

    fsExtra.remove(rPath, function(err){
        if (err) return console.error(err);
        console.info(`Removing source files success: ${rPath}`);
        if (cb){
            cb();
        }
    });
}

function copyFiles(){
    var proj = project.source;

    var include = (proj.include || []).map(function(f) {
        return path.resolve(f).replace(/\\/g, '\/');
    });
    var exclude = (proj.exclude || []).map(function(f) {
        return path.resolve(f).replace(/\\/g, '\/');
    });

    fsExtra.copy(proj.localSourcePath, proj.remoteSourcePath, { filter: function(src, dest) {
        //var isDir = fs.statSync(src).isDirectory();
        //var s = isDir ? src.replace(/\\/g, '\/') + '/' : src.replace(/\\/g, '\/');
        var s = src.replace(/\\/g, '\/');
        var isCopy = (mm.any(s, include, { dot: true }) || !include.length) &&
            (!mm.any(s, exclude, { dot: true }) || !exclude.length);

        if (isCopy){
            console.info(`Copying source : ${s}`);
            return true;
        }
        return false;
    }}, function(err) {
        console.error(err);
    });
}

function syncFiles(){
    removeFiles(copyFiles);
}

module.exports = {
    syncFiles: syncFiles
}
