'use strict';

(function() {
  require('jquery');

  var angular = require('../bower_components/angular/angular');

  // Main app dependencies
  require('../bower_components/angular-resource/angular-resource');
  require('../bower_components/angular-animate/angular-animate');
  require('../bower_components/angular-ui-router/release/angular-ui-router');
  require('../bower_components/angular-bootstrap/ui-bootstrap-tpls');
  require('../bower_components/jquery-ui/jquery-ui');
  require('../bower_components/sass-bootstrap/dist/js/bootstrap');

  // Angular modules
  require('./controllers/controllers');
  require('./directives/directives');
  require('./filters/filters');
  require('./services/services');

  // NVd3
  require('./angular_modules/nvd3-modules/chartbuilderNvd3');

  // Datamaps
  require('./angular_modules/datamaps/main');

  // Highcharts
  require('./angular_modules/highcharts/main');

  angular

    .module('angulard3Chartbuilder', [
      'ui.router',
      'ngResource',
      'ui.bootstrap',
      'ngAnimate',
      'chartbuilderControllers',
      'chartbuilderFilters',
      'chartbuilderServices',
      'chartbuilderDirectives',
      'chartbuilder.nvd3',
      'chartbuilder.datamaps',
      'chartbuilder.highcharts'
    ])

    .config([
      '$stateProvider',
      '$urlRouterProvider',
      '$locationProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('/', {
            url: '/',
            template: require('../partials/home.html'),
            controller: 'Home'
          })
          .state('chartbuilder', {
            url: '/chartbuilder',
            template: require('../partials/chartbuilder.html'),
            controller: 'Chartbuilder'
          })
          .state('about', {
            url: '/about',
            template: require('../partials/about.html')
          })
          .state('tutorials', {
            url: '/tutorials',
            template: require('../partials/tutorials.html'),
            controller: 'ChartbuilderTutorials'
          })
          .state('faq', {
            url: '/faq',
            template: require('../partials/faq.html'),
            controller: 'ChartbuilderFAQ'
          })
          .state('404', {
            url: '/404',
            template: require('../404.html')
          });

        $urlRouterProvider.otherwise('/');
    }]);

  angular.element(document).ready(function () {
    var $html = angular.element('html');
    angular.bootstrap($html, ['angulard3Chartbuilder']);
  });
})();
