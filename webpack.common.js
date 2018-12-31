const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: [
        //"@fortawesome/fontawesome-free/js/all.js",
        "bootstrap-loader/extractStyles",
        "./src/scss/app.scss",
        "./src/index.ts"
    ],
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devServer: {
        port: 9000,
        stats: "errors-only",
        hot: true,
        open: false,
        before(app, server) {
            devServer = server;
        },
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
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
        new webpack.HotModuleReplacementPlugin(),
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