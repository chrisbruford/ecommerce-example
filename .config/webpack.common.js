const path = require('path');

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
                    { loader: 'css-loader', options: {url: false} },
                    'sass-loader'
                ]
            }
        ]
    }
}