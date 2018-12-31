const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "./js/[name].bundle.js",
    },
    module: {
        
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader",
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
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles/[name].css",
            chunkFilename: "styles/[name].css"
        }),
    ]
});