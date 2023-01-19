const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {rules: [
        {
            test: /\.(ts|tsx|js)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "swc-loader",
                options: {
                    "jsc": {
                        "parser": {
                            "syntax": "typescript"
                        },
                        "transform": {
                            "react": {
                                "development": true,
                                "refresh": true
                            }
                        },
                        "experimental": {
                            "plugins": [
                                ["@swc-jotai/react-refresh", {}]
                            ]
                        }
                    }
                }
            }
        }
   ]},
   plugins: [new HtmlWebpackPlugin({ template: './src/index.html' }), new ReactRefreshWebpackPlugin()],
    devServer: {
        client: {
            webSocketURL: {
                port: 443,
            },
        },
        allowedHosts: 'all',
        hot: 'only',
    },
}