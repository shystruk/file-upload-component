const path = require('path');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

const common = {
    entry: [
        'babel-polyfill', './app/app.jsx'
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'index.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: 'babel-loader',
                exclude: /node_modules/,
                include: PATHS.app
            },
            {
                test: /\.jsx$/,
                loaders: 'babel-loader',
                exclude: /node_modules/,
                include: PATHS.app
            }
        ]
    }
};

module.exports = common;
