'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/index',
  
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.UglifyJsPlugin({
        compressor: { warnings: false }
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('css!stylus')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css')
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file'
      }
    ]
  },

  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};
