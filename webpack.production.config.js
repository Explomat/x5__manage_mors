var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require ('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var integrationBuild = require('./integration/build');
var integrationSource = require('./integration/source');
var project = require('./project.config');
var packageSettings = require('./package.json');

var publicPath =  `/${packageSettings.name}/client/`;

module.exports = {
    entry: {
        main: './src/index',
        react: ['react']
    },
    output: {
        path: project.build.remoteClientPath,
        publicPath: publicPath,
        filename: '[hash].bundle.js',
        library: '[name]'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        preLoaders: [
            {
                test: /(\.js$)|(\.jsx$)/,
                loaders: ['eslint'],
                include: [
                    path.resolve(__dirname, "src"),
                ],
            }
        ],
        loaders: [
            {
                test: /\.woff(2)?(\?)?(\d+)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: `url-loader?name=fonts/[hash].[name].[ext]&limit=65000&mimetype=application/font-woff&publicPath=${publicPath}`
            },
            {
                test: /\.(ttf|eot|svg)(\?)?(\d+)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: `url-loader?name=fonts/[hash].[name].[ext]&limit=65000&publicPath=${publicPath}`
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader")
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: `url-loader?name=images/[hash].[name].[ext]&publicPath=${publicPath}`
            },
            {
                test: /\.jsx$/,
                loaders: ['react-hot', 'babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: path.join(__dirname, 'src'),
            }
        ]
    },

    plugins: [
    	new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
	    }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'react',
            filename: `[hash].react.js`
        }),
        new ExtractTextPlugin('style/[hash].style.min.css', { allChunks: true }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
        new webpack.optimize.UglifyJsPlugin({ mangle: false }),
        new HtmlWebpackPlugin({
            template: 'dist/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true
        }),
        function build() {
            this.plugin('compile', function(statsData){
                integrationBuild.removeAllFiles();
            });
            this.plugin('done', function(statsData){
                var stats = statsData.toJson();

                if (!stats.errors.length) {
                    integrationBuild.copyServerFiles();
                    integrationSource.syncFiles();
                }
            });

            /*this.plugin('done', function(statsData){
                var stats = statsData.toJson();

                if (!stats.errors.length) {
                    var shtml = fs.readFileSync(path.join(__dirname, 'dist', 'sindex.html'), "utf8");

                    //<script src=<%=getRelativePath(AbsoluteUrl("react.js")) %>></script>
                    var react = _isArray(stats.assetsByChunkName.react) ? stats.assetsByChunkName.react[0] : stats.assetsByChunkName.react;
                    var style = stats.assetsByChunkName.main[1];
                    var bundle = stats.assetsByChunkName.main[0];
                    var htmlOutput = shtml
                        .replace(/<script\s+src=(<%=)?(?:\s+)?([A-Za-z0-9_()]+)(["'])\/react\.js(["'])([()]+)(?:\s+)?(%>)?/i,
                            "<script src=$1$2$3" + react + "$4$5$6")
                        .replace(/<link\s+(?:rel=["']stylesheet["']\s+type=["']text\/css["'])?\s+href=(<%=)?(?:\s+)?([A-Za-z0-9_()]+)(["'])\/style\/style\.min\.css(["'])([()]+)(?:\s+)?(%>)?/i,
                            "<link rel=\"stylesheet\" type=\"text/css\" href=$1$2$3" + style + "$4$5$6")
                        .replace(/<script\s+src=(<%=)?(?:\s+)?([A-Za-z0-9_()]+)(["'])\/bundle\.js(["'])([()]+)(?:\s+)?(%>)?/i,
                            "<script src=$1$2$3" + bundle + "$4$5$6")

                    fs.writeFileSync(
                        path.join(__dirname, 'dist', project.build.htmlFileName),
                        htmlOutput
                    );
                    fs.writeFileSync(
                        path.join(__dirname, 'stats.json'),
                        JSON.stringify(stats)
                    );
                }
            });*/
        }
    ]
}
