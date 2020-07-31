const path = require('path');

const appRoot = path.resolve(__dirname);
const appSrc = path.join(appRoot, 'src');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        vendor: ['react', 'react-dom'],
        polymer: path.join(appSrc, 'polymer-entry.js'),
        // react: path.join(appSrc, 'react-index.tsx'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    },
                ]
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'ts-loader' }
                ]
            }
        ]
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        path: path.join(appRoot, 'dist'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                from: './node_modules/@webcomponents/webcomponentsjs/*.js',
                to: 'node_modules/@webcomponents/webcomponentsjs/[name].[ext]',
            }]
        }),
        new HTMLWebpackPlugin({
            template: path.join(appSrc, 'templates/index.html'),
            filename: path.join(appRoot, 'dist/index.html'),
        }),
    ],
    devServer: {
        contentBase: path.join(appRoot, 'dist'),
        compress: true,
        port: 9000
    },
};
