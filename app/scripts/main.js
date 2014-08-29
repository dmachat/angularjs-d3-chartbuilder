'use strict';

define('main', [], function() {
  requirejs.config({
    paths: {
      'angular': '../bower_components/angular/angular',
      'angular-resource': '../bower_components/angular-resource/angular-resource',
      'angular-animate': '../bower_components/angular-animate/angular-animate',
      'ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
      'ui-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap',
      'modernizr': '../bower_components/modernizr/modernizr',
      'comma-separated-values': '../bower_components/comma-separated-values/csv',
      'jquery': '../bower_components/jquery/dist/jquery',
      'jqueryui': '../bower_components/jquery-ui/jquery-ui',
      'underscore': '../bower_components/underscore/underscore',
      'bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap',
      'd3': '../bower_components/d3/d3',
      'nv.d3': '../bower_components/nvd3/nv.d3',
      'rgbcolor': '../bower_components/canvg/rgbcolor',
      'StackBlur': '../bower_components/canvg/StackBlur',
      'canvg': '../bower_components/canvg/canvg',
      'controllers': './controllers/controllers',

      // Directives
      'directives': './directives/directives',
      'options': './directives/options',
      'data-input': './directives/data-input',
      'edit-in-place': './directives/edit-in-place',
      'd3-options': './directives/options-constants',

      'filters': './filters/filters',
      'services': './services/services',
      'slugifier': './angular_modules/angular-slugify/angular-slugify',
      'ui.sortable': './angular_modules/ui-sortable/sortable',
      'angular-file-input': './angular_modules/angular-file-input/angular-file-input',
      'angular-color-picker': './angular_modules/angular-color-picker/angular-color-picker',
      'text': './vendor/text',

      // NVd3
      'chartbuilder.nvd3': './angular_modules/nvd3-modules/angular-nvd3',
      'chartbuilder.nvd3.linechart': './angular_modules/nvd3-modules/linechart/main',
      'chartbuilder.nvd3.barchart': './angular_modules/nvd3-modules/barchart/main',
      'chartbuilder.nvd3.multiBarChart': './angular_modules/nvd3-modules/multiBarChart/main',
      'chartbuilder.nvd3.pieChart': './angular_modules/nvd3-modules/pieChart/main',
      'chartbuilder.nvd3.historicalBarChart': './angular_modules/nvd3-modules/historicalBarChart/main',
      'chartbuilder.nvd3.stackedAreaChart': './angular_modules/nvd3-modules/stackedAreaChart/main',
      'chartbuilder.nvd3.scatterChart': './angular_modules/nvd3-modules/scatterChart/main',
      'chartbuilder.nvd3.scatterPlusLineChart': './angular_modules/nvd3-modules/scatterPlusLineChart/main',

      // Maps
      'topojson': '../bower_components/topojson/topojson',
      'datamaps': '../bower_components/datamaps/dist/datamaps.all',
      'chartbuilder.datamaps': './angular_modules/datamaps/angular-datamaps',
      'chartbuilder.datamaps.usa': './angular_modules/datamaps/main'
    },
    shim: {
      'angular': {
        deps: ['jquery'],
        exports: 'angular'
      },
      'underscore': {
        exports: '_'
      },
      'jquery': {
        exports: '$'
      },
      'd3': {
        exports: 'd3'
      },
      'comma-separated-values': {
        exports: 'CSV'
      },
      'angular-resource': ['angular'],
      'angular-animate': ['angular'],
      'ui-router': ['angular'],
      'ui-bootstrap': ['angular'],
      'bootstrap': ['jquery'],
      'controllers': ['angular', 'services'],
      'filters': ['angular'],
      'services': ['angular'],
      'directives': ['angular'],
      'options': ['directives'],
      'data-input': ['directives'],
      'edit-in-place': ['directives'],
      'd3-options': ['directives'],
      'angular-file-input': ['angular'],
      'slugifier': ['angular'],
      'jqueryui': ['jquery'],
      'ui.sortable': ['angular', 'jquery', 'jqueryui'],

      // Shim the nvd3 modules
      'nv.d3': ['d3'],
      'chartbuilder.nvd3': ['angular', 'nv.d3'],
      'chartbuilder.nvd3.linechart': ['chartbuilder.nvd3'],
      'chartbuilder.nvd3.barchart': ['chartbuilder.nvd3'],
      'chartbuilder.nvd3.multiBarChart': ['chartbuilder.nvd3'],
      'chartbuilder.nvd3.pieChart': ['chartbuilder.nvd3'],
      'chartbuilder.nvd3.historicalBarChart': ['chartbuilder.nvd3'],
      'chartbuilder.nvd3.stackedAreaChart': ['chartbuilder.nvd3'],
      'chartbuilder.nvd3.scatterChart': ['chartbuilder.nvd3'],
      'chartbuilder.nvd3.scatterPlusLineChart': ['chartbuilder.nvd3'],

      // Shim the datamap modules
      'topojson': {
        deps: ['d3'],
        exports: 'topojson'
      },
      'datamaps': {
        deps: ['d3', 'topojson'],
        exports: 'Datamap'
      },
      'chartbuilder.datamaps': ['d3', 'topojson', 'datamaps'],
      'chartbuilder.datamaps.usa': ['chartbuilder.datamaps']
    }
  });

  requirejs([
    'angular',
    'text!../partials/home.html',
    'text!../partials/chartbuilder.html',
    'text!../partials/about.html',
    'text!../404.html',
    'jquery',
    'jqueryui',
    'angular-resource',
    'angular-animate',
    'ui-router',
    'ui-bootstrap',
    'underscore',
    'd3',
    'nv.d3',
    'bootstrap',
    'modernizr',
    'comma-separated-values',
    'angular-file-input',
    'services',
    'filters',
    'directives',
    'options',
    'data-input',
    'edit-in-place',
    'd3-options',
    'controllers',
    'slugifier',
    'ui.sortable',
    'chartbuilder.nvd3',
    'chartbuilder.nvd3.linechart',
    'chartbuilder.nvd3.barchart',
    'chartbuilder.nvd3.multiBarChart',
    'chartbuilder.nvd3.pieChart',
    'chartbuilder.nvd3.historicalBarChart',
    'chartbuilder.nvd3.stackedAreaChart',
    'chartbuilder.nvd3.scatterChart',
    'chartbuilder.nvd3.scatterPlusLineChart',
    'datamaps',
    'topojson',
    'chartbuilder.datamaps',
    'chartbuilder.datamaps.usa'
  ], function(angular, homeTemplate, chartbuilderTemplate, aboutTemplate, pageNotFoundTemplate) {

    /* App Module */
    angular.element(document).ready(function () {
      // smart works go here
      var $html = angular.element('html');
      angular.module('angulard3Chartbuilder', [
        'ui.router',
        'ngResource',
        'ui.bootstrap',
        'ngAnimate',
        'chartbuilderControllers',
        'chartbuilderFilters',
        'chartbuilderServices',
        'chartbuilderDirectives',
        'fileInput',
        'slugifier',
        'ui.sortable',
        'chartbuilder.nvd3',
        'chartbuilder.nvd3.linechart',
        'chartbuilder.nvd3.barchart',
        'chartbuilder.nvd3.multiBarChart',
        'chartbuilder.nvd3.pieChart',
        'chartbuilder.nvd3.historicalBarChart',
        'chartbuilder.nvd3.stackedAreaChart',
        'chartbuilder.nvd3.scatterChart',
        'chartbuilder.nvd3.scatterPlusLineChart',
        'datamaps',
        'chartbuilder.datamaps.usa'
      ]).config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
          $stateProvider.
            state('/', {
              url: '/',
              template: homeTemplate
            }).
            state('chartbuilder', {
              url: '/chartbuilder',
              template: chartbuilderTemplate,
              controller: 'Chartbuilder'
            }).
            state('about', {
              url: '/about',
              template: aboutTemplate
            }).
            state('404', {
              url: '/404',
              template: pageNotFoundTemplate
            });

          //$locationProvider.html5Mode(true);
          $urlRouterProvider.otherwise('/');
      }]);
      // bootstrap model
      angular.bootstrap($html, ['angulard3Chartbuilder']);
    });
  });
});
