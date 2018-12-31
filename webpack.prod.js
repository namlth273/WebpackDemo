const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "./js/[hash].bundle.js",
    },
    devServer: {
        open: false,
        writeToDisk: true,
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
                {
                    loader: "sass-resources-loader",
                    options: {
                        resources: [
                            path.resolve(__dirname, "src/scss/_variables.scss"),
                            path.resolve(__dirname, "node_modules/@fortawesome/fontawesome-free/scss/solid.scss"),
                            // path.resolve(__dirname, "node_modules/@fortawesome/fontawesome-free/scss/regular.scss"),
                            // path.resolve(__dirname, "node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss"),
                            path.resolve(__dirname, "node_modules/bootstrap/scss/_functions.scss"),
                            path.resolve(__dirname, "node_modules/bootstrap/scss/_variables.scss"),
                            path.resolve(__dirname, "node_modules/bootstrap/scss/_mixins.scss"),
                        ]
                    }
                },
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles/[hash].css",
            chunkFilename: "styles/[hash].css"
        }),
    ]
});