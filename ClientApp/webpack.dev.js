const { merge } = require("webpack-merge");
const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const common = require("./webpack.common.js");

const backend = {
    target: "https://localhost:5001",
    secure: false,
    ws: true
};

module.exports = merge(common, {
    mode: "development",
    devtool: "eval-source-map",

    devServer: {
        https: true,
        port: 3000,
        openPage: "https://localhost:3000/",
        allowedHosts: ["localhost", "bs-local.com"], // bs-local.com was added to allow for testing in safari in IOS version 10++ via browserstack
        historyApiFallback: true,
        host: "0.0.0.0",
        proxy: {
            "/account": backend,
            "/config": backend,
        }

    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', ".css"]
    },

    module: {

        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            configFile: "./babel.config.js"
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "less-loader", // compiles Less to CSS
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(), // HMR 2/2
        new CaseSensitivePathsPlugin(),
    ]
});
