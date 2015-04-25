var path = require('path');
var webpack = require('webpack');
//var HtmlWebpackPlugin = require("html-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");

var sweetJSMacrosPath = path.join(__dirname, 'src/macros/index.js')

var config = {
    context: path.join(__dirname, 'src'),
    entry: {
        index: './bootstrap',
        vendor: ['./vendor'],
        apps_api: './AppsAPI/Library/APILibrary',
        ui: ['../semantic/dist/semantic.min.css', '../semantic/dist/semantic.min.js']
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        /*
        new CompressionPlugin({
            asset: "{file}.gz",
            algorithm: "gzip",
            regExp: /\.css$|\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.5
        })//*/
    ],
    module: {
        loaders: [
            //{test: /\.json$/, loader: "json-loader" },
        	{test: /\.jade$/, loader: "jade-loader" },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.jsx$/, loader: 'sweetjs?modules[]='+sweetJSMacrosPath+'!es6-loader!msx-loader'},
            {test: /\.js$/,  loader: 'sweetjs?modules[]='+sweetJSMacrosPath+'!es6-loader!msx-loader'},
            {test: /\.less$/,loader: "style-loader!css-loader!less-loader?strictMath&cleancss"},
            {
                test: /\.(eot|woff|ttf|svg|png|jpg|gif|woff|woff2)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            },
        ]
    }

};

module.exports = config;