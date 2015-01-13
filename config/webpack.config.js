var path = require('path'),
    webpack = require('webpack'),

    appRoot = path.join(__dirname, '../app'),
    bowerRoot = path.join(__dirname, '../app/bower_components'),
    modulesRoot = path.join(__dirname, '../app/angular_modules');

module.exports = {
  cache: true,

  entry: path.join(appRoot, 'scripts/main.js'),

  output: {
		path: path.join(__dirname, '../dist/scripts'),
    filename: 'main.bundle.js',
    chunkFilename: '[id].main.bundle.js'
  },

  resolve: {
    root: bowerRoot,

    alias: {
      'jquery': path.join(bowerRoot, 'jquery/dist/jquery'),
      'd3': path.join(bowerRoot, 'd3-browserify/d3'),
      'topojson': path.join(bowerRoot, 'topojson/topojson'),
      'datamaps': path.join(bowerRoot, 'datamaps/dist/datamaps.usa'),
      'nvd3': path.join(bowerRoot, 'nvd3/nv.d3')
    },
  },

  plugins: [],

  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules')
    ]
  },

  module: {
    noParse: [ bowerRoot ],
    loaders: [
      {
        test: /[\/]angular(\.min)?\.js$/,
        loader: 'exports?angular'
      },
      {
        test: /[\/]jquery(\.min)?\.js$/,
        loader: 'expose?jQuery'
      },
      {
        test: /[\/]datamaps(\.\w)?(\.min)?\.js$/,
        loader: 'exports?Datamap'
      },
      {
        test: /[\/]nv\.d3(\.\w)?(\.min)?\.js$/,
        loader: 'imports?d3!exports?nv'
      },
      {
        test: /[\/]datamaps(\.\w)?(\.min)?\.js$/,
        loader: 'imports?d3,topojson'
      },
      {
        test: /[\/]angular-datamaps(\.min)?\.js$/,
        loader: 'imports?Datamap=datamaps'
      },
      {
        test: /[\/]bootstrap(\.min)?\.js$/,
        loader: 'imports?jQuery=jquery'
      },
      {
        test: /[\/]spectrum(\.min)?\.js$/,
        loader: 'imports?jQuery=jquery'
      },
      {
        test: /[\/]angular-nvd3(\.min)?\.js$/,
        loader: 'imports?nv=nvd3,d3'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.png$/,
        loader: 'url'
      }
    ]
  }
}
