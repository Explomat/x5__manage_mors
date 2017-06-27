var express = require("express");
var MemoryFS = require("memory-fs");
var path = require('path');
var MemoryFileSystem = require("memory-fs");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpack = require("webpack");
var webpackConfig  = require("./webpack.config.js");
var proxy = require('http-proxy-middleware');
var project = require('./project.config');

var app = express();
var compiler = webpack(webpackConfig);

var mfs = new MemoryFS();
compiler.outputFileSystem = mfs;

var devMiddlware = webpackDevMiddleware(compiler, {
	hot: true,
	publicPath: "/",
	stats: { colors: true }
});
app.use(devMiddlware);

app.use(webpackHotMiddleware(compiler, {
	log: console.log,
	path: '/__webpack_hmr',
	heartbeat: 10 * 1000
}));


var apiProxy = proxy({
	target: project.common.proxyServer,
	auth: 'user1:user1',
	changeOrigin: true
});
//\/custom_web_template\.html\?object_id=\d+&server_id=\d+(&\w+)?
app.use('/custom_web_template.html', apiProxy);

app.use('/', function (req, res, next) {
	var filename = path.join(compiler.outputPath, 'index.html');

	res.set('Content-Type','text/html');
	res.send(compiler.outputFileSystem.readFileSync(filename, 'utf8'));
	res.end();
});

app.listen(8080, function () {
	console.log("Listening on port 8080!");
});

// if (require.main === module) {
//   var server = http.createServer(app);
//   server.listen(process.env.PORT || 8080, function() {
//     console.log("Listening on %j", server.address());
//   });
// }

/*var server = new WebpackDevServer(compiler, {
  // webpack-dev-server options

  contentBase: "/",
  // Can also be an array, or: contentBase: "http://localhost/",

  hot: true,
  // Enable special support for Hot Module Replacement
  // Page is no longer updated, but a "webpackHotUpdate" message is sent to the content
  // Use "webpack/hot/dev-server" as additional module in your entry point
  // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

  historyApiFallback: true,
  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.

  compress: true,
  // Set this if you want to enable gzip compression for assets

  proxy: [
	  {
		  "\/custom_web_template\.html\?object_id=\d+&server_id=\d+&\w+": "http://studytest.x5.ru"
	  }
  ],
  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use "**" to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).

  setup: function(app) {
	// Here you can access the Express app object and add your own custom middleware to it.
	// For example, to define custom handlers for some paths:
	// app.get('/some/path', function(req, res) {
	//   res.json({ custom: 'response' });
	// });
  },

  // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
  staticOptions: {
  },

  clientLogLevel: "info",
  // Control the console log messages shown in the browser when using inline mode. Can be `error`, `warning`, `info` or `none`.

  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  lazy: true,
  filename: "bundle.js",
  watchOptions: {
	aggregateTimeout: 300,
	poll: 1000
  },
  // It's a required option.
  publicPath: "/",
  headers: { "X-Custom-Header": "yes" },
  stats: { colors: true }
});
server.listen(8080, "0.0.0.0", function() { console.log('Server started at port ' + 8080) });*/
