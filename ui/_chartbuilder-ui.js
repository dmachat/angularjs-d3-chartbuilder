'use strict';

define('main', [], function() {
  requirejs.config({
    paths: {
      // Libraries
      'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min',
      'd3': '//cdnjs.cloudflare.com/ajax/libs/d3/3.4.13/d3.min',
      'nvd3': '//cdnjs.cloudflare.com/ajax/libs/nvd3/1.1.15-beta/nv.d3.min',
      'topojson': '//cdnjs.cloudflare.com/ajax/libs/topojson/1.1.0/topojson.min',
      'datamaps': '//dmachat.github.io/angularjs-d3-chartbuilder/bower_components/datamaps/dist/datamaps.all',

      // Angular
      'angular-datamaps': '//dmachat.github.io/angularjs-d3-chartbuilder/angular_modules/datamaps/angular-datamaps',
      'angular-nvd3': '//dmachat.github.io/angularjs-d3-chartbuilder/angular_modules/nvd3-modules/angular-nvd3',
    },
    shim: {
      'angular': {
        exports: 'angular'
      },
      'd3': {
        exports: 'd3'
      },

      // Shim nvd3
      'nv.d3': ['d3'],
      'chartbuilder.nvd3': ['angular', 'nv.d3', 'services'],

      // Shim datamaps
      'topojson': {
        deps: ['d3'],
        exports: 'topojson'
      },
      'datamaps': {
        deps: ['angular', 'd3', 'topojson'],
        exports: 'Datamap'
      },
      'angular-datamaps': ['d3', 'topojson', 'datamaps'],
    }
  });
  requirejs([
    'angular',
    'd3',
    'nvd3',
    'topojson',
    'datamaps',
    'angular-datamaps',
    'angular-nvd3',
    function(angular) {
      angular.module('chartbuilderOptions', []);
    });
});
