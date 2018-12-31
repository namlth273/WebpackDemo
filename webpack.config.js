const isDevMode = process.env.NODE_ENV !== "production";
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const pathsToClean = [
    "dist"
];

// the clean options to use
const cleanOptions = {
    root: __dirname,
    verbose: true,
    dry: false
};

module.exports = {
    mode: "development",
    entry: [
        "@fortawesome/fontawesome-free/js/all.js",
        "bootstrap-loader/extractStyles",
        "./src/scss/app.scss",
        "./src/index.ts"
    ],
    output: {
        filename: "./js/[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
        stats: "errors-only",
        hot: true,
        before(app, server) {
            devServer = server;
        },
        //watchContentBase: true,
        //compress: true,
        //open: true,
        //writeToDisk: true,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "main",
                    test: /\.scss$/,
                    chunks: "all",
                    enforce: true
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "sass-resources-loader",
                        options: {
                            resources: [
                                path.resolve(__dirname, "node_modules/bootstrap/scss/_functions.scss"),
                                path.resolve(__dirname, "node_modules/bootstrap/scss/_variables.scss"),
                                path.resolve(__dirname, "node_modules/bootstrap/scss/_mixins.scss"),
                                path.resolve(__dirname, "src/scss/resources.scss"),
                            ]
                        }
                    },
                ]
            },
            // {
            //     test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //     use: "url-loader?limit=10000",
            // },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?[\s\S]+)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/",
                        publicPath: "../fonts/"
                    }
                }]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: isDevMode ? "styles/[name].css" : "styles/[name].[hash].css",
            chunkFilename: isDevMode ? "styles/[id].css" : "styles/[id].[hash].css"
        }),
        new HtmlWebpackPlugin({
            title: "Webpack Demo",
            minify: {
                collapseWhitespace: true
            },
            template: "src/index.html",
        }),
        reloadHtml,
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            tether: "tether",
            Tether: "tether",
            "window.Tether": "tether",
            Popper: ["popper.js", "default"],
            "window.Tether": "tether",
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util"
        }),
    ]
};

//auto reload html
var devServer;

function reloadHtml() {
    const cache = {}
    const plugin = {
        name: 'CustomHtmlReloadPlugin'
    }
    this.hooks.compilation.tap(plugin, compilation => {
        compilation.hooks.htmlWebpackPluginAfterEmit.tap(plugin, data => {
            const orig = cache[data.outputName]
            const html = data.html.source()
            // plugin seems to emit on any unrelated change?
            if (orig && orig !== html) {
                devServer.sockWrite(devServer.sockets, 'content-changed')
            }
            cache[data.outputName] = html
        })
    })
}