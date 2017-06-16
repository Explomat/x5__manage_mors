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
        filename: '[chunkhash].bundle.js',
        library: '[name]'
    },
    resolve: {
        modules: [ path.join(__dirname, 'src'), 'node_modules' ],
        extensions: [ '.js', '.jsx' ],
    },
    module: {
        rules: [
            {
                test: /(\.js$)|(\.jsx$)/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                options: {
                	fix: true
                }
            },
            {
                test: /\.woff(2)?(\?)?(\d+)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    publicPath: publicPath,
                    name: 'fonts/[chunkhash].[name].[ext]',
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?)?(\d+)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    publicPath: publicPath,
                    name: 'fonts/[chunkhash].[name].[ext]',
                    limit: 10000
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ 'css-loader', 'postcss-loader', 'sass-loader' ]
                })
            },
            {
                test: /\.styl$/,
                loader:  ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ 'css-loader', 'postcss-loader', 'stylus-loader' ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    publicPath: publicPath,
                    name: 'images/[chunkhash].[name].[ext]'
                }
            },
            {
                test: /\.jsx$/,
                use: [
                    'react-hot-loader',
                    'babel-loader'
                ],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
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
        new ExtractTextPlugin({
            filename: 'style/[chunkhash].style.min.css',
            allChunks: true,
            disable: false
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
        new webpack.optimize.UglifyJsPlugin({ mangle: false }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'dist', 'index.html'),
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
                fs.writeFileSync(
                    path.join(__dirname, 'dist', 'stats.json'),
                    statsData
                );

                if (!stats.errors.length && project.build.syncSources) {
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
