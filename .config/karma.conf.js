const webpackConfig = require('./webpack.test');

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],

        files: [
            { pattern: '../src/**/*.spec.js', watched: false, exclude: ['../**/node_modules/*'] }
        ],

        preprocessors: {
            '../src/**/*.spec.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: true
        },

        browsers: ['Chrome'],

        reporters: ['progress'],
    });
};
