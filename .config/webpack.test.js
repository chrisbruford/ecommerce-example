const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
   
});