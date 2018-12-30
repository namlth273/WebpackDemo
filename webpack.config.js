const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// const sassResources = require("./src/scss/resources/resources");

// the path(s) that should be cleaned
const pathsToClean = [
    "dist"
];

// the clean options to use
const cleanOptions = {
    root: __dirname,
    //exclude: ["shared.js"],
    verbose: true,
    dry: false
};

module.exports = {
    mode: "development",
    entry: [
        "bootstrap-loader/extractStyles",
        "./src/scss/app.scss",
        "@fortawesome/fontawesome-free/js/all.js",
        "./src/index.ts"
    ],
    output: {
        filename: "./js/[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map",
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        //compress: true,
        //port: 9000,
        stats: "errors-only",
        //open: true,
        writeToDisk: true,
        hot: true
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
        }
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
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    //"file-loader",
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "sass-resources-loader",
                        options: {
                            // resources: sassResources
                            resources: [
                                // path.resolve(__dirname, "node_modules/@fortawesome/fontawesome-free/scss/regular.scss"),
                                // path.resolve(__dirname, "node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss"),
                                path.resolve(__dirname, "node_modules/bootstrap/scss/_functions.scss"),
                                path.resolve(__dirname, "node_modules/bootstrap/scss/_variables.scss"),
                                path.resolve(__dirname, "node_modules/bootstrap/scss/_mixins.scss"),
                                path.resolve(__dirname, "src/scss/resources.scss"),
                            ]
                        }
                    }
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
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "styles/[name].css",
            chunkFilename: "styles/[id].css"
        }),
        new HtmlWebpackPlugin({
            title: "Webpack Demo",
            minify: {
                collapseWhitespace: false
            },
            template: "src/index.html",
            // filename: "index.html"
        }),
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