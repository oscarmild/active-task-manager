const nodeExternals = require('webpack-node-externals');
const path = require("path");
const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin"); 
   
module.exports = (env, argv) => { 
    return {
        
        entry: {app: './index.ts'},

        externalsPresets: { node: true },
        context: __dirname,

        externals: [nodeExternals()],
        output: {
            path: path.join(__dirname, "dist"),
            filename: "active-task-v-01.js"
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    { from: "package.json" },
                    { from: "package-lock.json" },
                    { from: "env/default.json" },
                    { from: `env/${env.APP_ENV}.json` },
                ],
            }),
            new webpack.DefinePlugin({
                "process.env.APP_ENV": JSON.stringify(env.APP_ENV),
            }),
        ],
        node: {
            __dirname: true
        },
        resolve: {
            extensions: [".ts", ".js", ".json"],
        },
        module: {
            rules: [
                {
                    use: [
                        {
                            loader: "ts-loader",
                        }
                    ]
                }
            ]
        }
    }
}
