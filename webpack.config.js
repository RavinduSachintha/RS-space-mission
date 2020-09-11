const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

const htmlConfig = {
    filename: 'index.html',
    template: './index.html',
    inject: 'body',
    hash: false
};

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebPackPlugin(htmlConfig),
        new ZipPlugin({
            filename: 'rs404.zip'
        })
    ]
};