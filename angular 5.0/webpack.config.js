const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    root: path.join(__dirname, ''),
    build: path.join(__dirname, 'build')
};

const common = {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: [ path.resolve(PATHS.root, 'build'), path.resolve(PATHS.root, 'vendor') ],
        port: 8080,
        inline: false
    },
    entry: {
        app: `${PATHS.root}/app.ts`,
        vendor: `${PATHS.root}/vendor.ts`,
        polyfills: `${PATHS.root}/polyfills.ts`
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            'saveAs': `${PATHS.root}/vendor/FileSaver.min.js`
        }
    },
    output: {
        path: PATHS.build,
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: `${PATHS.root}/tsconfig.json`
                        }
                    },
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader']
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            `${PATHS.root}/app`,
            {}
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};

module.exports = common;
