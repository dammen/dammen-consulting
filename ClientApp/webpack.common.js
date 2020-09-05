const path = require("path");
const webpack = require("webpack");
const envKeys = require("./envkeys");

module.exports = {
    entry: ["./src/index.tsx"],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: ["file-loader"]
            },

            {
                test: /\.svg$/,
                use: [
                    { loader: "svg-sprite-loader" },
                    {
                        loader: "svgo-loader",
                        options: {
                            plugins: [
                                { removeTitle: true },
                                { convertColors: { shorthex: false } },
                                { convertPathData: false }
                            ]
                        }
                    }
                ]
            }
        ]
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "../server/dammenConsulting/dammenConsulting/wwwroot"),
        publicPath: "/"
    },
    plugins: [
        new webpack.DefinePlugin(envKeys),
    ]

};
