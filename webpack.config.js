const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const sassResources = require("./src/scss/resources/resources");

module.exports = {
    mode: "development",
    entry: [
        "font-awesome-loader",
        "bootstrap-loader",
        "./src/index.js"
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        //compress: true,
        //port: 9000,
        stats: "errors-only",
        //open: true,
        //writeToDisk: true,
        hot: true
    },
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
        // path: __dirname
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    },
                    {
                        loader: "sass-resources-loader",
                        options: {
                            // resources: sassResources
                            resources: [
                                path.resolve(__dirname, "node_modules/bootstrap/scss/_functions.scss"),
                                path.resolve(__dirname, "node_modules/bootstrap/scss/_variables.scss"),
                                path.resolve(__dirname, "node_modules/bootstrap/scss/_mixins.scss"),
                                path.resolve(__dirname, "src/scss/resources.scss"),
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader?limit=10000",
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: "file-loader",
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "Webpack Demo",
            minify: {
                collapseWhitespace: false
            },
            template: "index.html",
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