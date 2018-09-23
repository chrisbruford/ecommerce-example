const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        // polyfills: ['@babel/polyfill'],
        main: './src/app.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env',{useBuiltIns: 'usage'}]
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}