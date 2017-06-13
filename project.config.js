var packageSettings = require('./package.json');
var path = require('path');
var exportPath = '\\\\msk-kltn-app007\\d$\\WebSoft\\WebTutorServer\\wt\\web';

var common = {
	remotePath: path.join(exportPath, packageSettings.name)
}

var build = {
	localClientPath: path.join(__dirname, 'dist'),
	localServerPath: path.join(__dirname, 'server'),
	remoteClientPath: path.join(exportPath, packageSettings.name, 'client'),
	remoteServerPath: path.join(exportPath, packageSettings.name, 'server')
}

var source = {
	localSourcePath: __dirname,
	remoteSourcePath: path.join(exportPath, 'x5__sources', packageSettings.name),
	exclude: [ '.git/', 'node_modules/' ]
}

module.exports = {
	common: common,
	build: build,
	source: source
}
