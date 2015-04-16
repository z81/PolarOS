var path = require('path');
var webpack = require('webpack');
//var HtmlWebpackPlugin = require("html-webpack-plugin");

var config = {
    context: path.join(__dirname, 'test'),
    entry: 'mocha!./test.js',
    output: './testBunble.js',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            //{test: /\.json$/, loader: "json-loader" },
        	{test: /\.jade$/, loader: "jade-loader" },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.jsx$/, loader: 'es6-loader!msx-loader'},
            {test: /\.js$/,  loader: 'es6-loader!msx-loader'},
            {test: /\.less$/,loader: "style-loader!css-loader!less-loader?strictMath&cleancss"},
            {
                test: /\.(eot|woff|ttf|svg|png|jpg|gif|woff)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            },
        ]
    }

};

module.exports = config;
