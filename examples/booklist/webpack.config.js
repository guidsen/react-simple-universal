'use strict'; // eslint-disable-line strict

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  resolve: {
    root: path.join(__dirname, 'source')
  },
  entry: [
    'webpack-hot-middleware/client',
    './source/client'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: [
        path.join(__dirname, 'source')
      ]
    }]
  }
};
