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
						'jqueryui': '../bower_components/jquery-ui/ui/jquery-ui',
            'underscore': '../bower_components/underscore/underscore',
            'bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap',
            'd3': '../bower_components/d3/d3',
            'nvd3': '../bower_components/nvd3/nv.d3',
            'nvd3ChartDirectives': './angular_modules/angularjs-nvd3-directives/dist/angularjs-nvd3-directives',
            'controllers': 'controllers/controllers',
            'directives': 'directives/directives',
            'filters': 'filters/filters',
            'services': 'services/services',
            'slugifier': './angular_modules/angular-slugify/angular-slugify',
						'ui.sortable': './angular_modules/ui-sortable/sortable'
        },
        shim: {
            'angular': {
                exports: 'angular'
            },
            'underscore': {
                exports: '_'
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
            'slugifier': ['angular'],
						'jqueryui': ['jquery'],
						'ui.sortable': ['jquery', 'jqueryui']
        }
    });

    Window.name = 'NG_DEFER_BOOTSTRAP!';

    requirejs([
        'angular',
        'jquery',
				'jqueryui',
        'angular-resource',
        'angular-animate',
        'ui-router',
        'ui-bootstrap',
        'underscore',
        'd3',
        'nvd3',
        'nvd3ChartDirectives',
        'bootstrap',
        'modernizr',
        'services',
        'filters',
        'directives',
        'controllers',
        'slugifier',
				'ui.sortable'
    ], function(angular) {
        'use strict';

        /* App Module */
        angular.element(document).ready(function () {
            // smart works go here
            var $html = angular.element('html');
            angular.module('angulard3Chartbuilder', [
                'ui.router',
                'ngResource',
                'ui.bootstrap',
                'ngAnimate',
                'webControllers',
                'webFilters',
                'webServices',
                'webDirectives',
                'nvd3ChartDirectives',
                'slugifier',
								'ui.sortable'
            ]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
                function($stateProvider, $urlRouterProvider, $locationProvider) {
                    $stateProvider.
                      state('/', {
                          url: '/',
                          templateUrl: 'partials/home.html',
                          controller: 'Home'
                      }).
                      state('chartbuilder', {
                          url: '/chartbuilder',
                          templateUrl: 'partials/chartbuilder.html',
                          controller: 'Chartbuilder'
                      }).
											state('chartbuilder.graph', {
													url: '/:graphType',
													templateUrl: function(stateParams) {
														return 'partials/charts/' + stateParams.graphType + '.html';
													}
											}).
                      state('about', {
                          url: '/about',
                          templateUrl: 'partials/about.html',
                          controller: 'About'
                      }).
                      state('404', {
                          url: '/404',
                          templateUrl: '404.html'
                      });
                    $urlRouterProvider.otherwise('/404');

										$locationProvider.html5Mode(true);
                }
            ]);
            // bootstrap model
            angular.bootstrap($html, ['angulard3Chartbuilder']);
        });
    });
});
