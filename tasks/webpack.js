module.exports = function(grunt) {
  var webpack = require('webpack'),
      webpackConfig = require('../config/webpack.config.js');

  return {
    options: webpackConfig,
    prod: {
      plugins: webpackConfig.plugins.concat(
        new webpack.optimize.UglifyJsPlugin({
          minimize: true,
          mangle: false,
          preserveComments: false
        })
      ),
      output: {
        filename: 'main.bundle.min.js',
        chunkFilename: '[id].main.bundle.min.js'
      }
    },
    dev: {
      debug: true
    }
  }
}
