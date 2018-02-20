const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Bundle for nodeJs not browser
  target: 'node',

  // Entry point
  entry: './src/index.js',

  // Tell webpack where the to output generated files
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);