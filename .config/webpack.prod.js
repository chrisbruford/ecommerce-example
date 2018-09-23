const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = webpackMerge(commonConfig, {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false } },
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyWebpackPlugin([
            { from: './src/*.html', flatten: true },
            { from: './**/*.+(png|jpg|jpeg|gif)', to: './assets', context: './src/assets/' }
        ]),
        new MiniCssExtractPlugin()
    ]
});