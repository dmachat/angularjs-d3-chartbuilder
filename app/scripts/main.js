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
      'jquery': '../bower_components/jquery/dist/jquery',
      'jqueryui': '../bower_components/jquery-ui/jquery-ui',
      'underscore': '../bower_components/underscore/underscore',
      'bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap',
      'd3': '../bower_components/d3/d3',
      'nv.d3': '../bower_components/nvd3/nv.d3',
      'controllers': './controllers/controllers',

      // Directives
      'directives': './directives/directives',
      'options': './directives/options',
      'data-input': './directives/data-input',
      'edit-in-place': './directives/edit-in-place',

      'filters': './filters/filters',
      'services': './services/services',
      'slugifier': './angular_modules/angular-slugify/angular-slugify',
      'ui.sortable': './angular_modules/ui-sortable/sortable',
      'text': './vendor/text',
      'chartbuilder.nvd3': './angular_modules/nvd3-modules/angular-nvd3',
      'chartbuilder.nvd3.linechart': './angular_modules/nvd3-modules/linechart/main',
      'chartbuilder.nvd3.barchart': './angular_modules/nvd3-modules/barchart/main',
      'chartbuilder.nvd3.multiBarChart': './angular_modules/nvd3-modules/multiBarChart/main'
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
      'angular-resource': ['angular'],
      'angular-animate': ['angular'],
      'ui-router': ['angular'],
      'ui-bootstrap': ['angular'],
      'bootstrap': ['jquery'],
      'controllers': ['angular', 'services'],
      'filters': ['angular'],
      'services': ['angular'],
      'directives': ['angular'],
      'options': ['angular'],
      'data-input': ['angular'],
      'edit-in-place': ['angular'],
      'slugifier': ['angular'],
      'jqueryui': ['jquery'],
      'ui.sortable': ['angular', 'jquery', 'jqueryui'],
      'nv.d3': ['d3'],
      'chartbuilder.nvd3': ['angular'],
      'chartbuilder.nvd3.linechart': ['angular'],
      'chartbuilder.nvd3.barchart': ['angular'],
      'chartbuilder.nvd3.multiBarChart': ['angular']
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
    'services',
    'filters',
    'directives',
    'options',
    'data-input',
    'edit-in-place',
    'controllers',
    'slugifier',
    'ui.sortable',
    'chartbuilder.nvd3',
    'chartbuilder.nvd3.linechart',
    'chartbuilder.nvd3.barchart',
    'chartbuilder.nvd3.multiBarChart'
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
        'slugifier',
        'ui.sortable',
        'chartbuilder.nvd3',
        'chartbuilder.nvd3.linechart',
        'chartbuilder.nvd3.barchart',
        'chartbuilder.nvd3.multiBarChart'
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
