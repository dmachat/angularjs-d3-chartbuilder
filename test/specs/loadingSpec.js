define('loadingSpec', [
    'angular',
    'angular-route',
    'angular-resource',
    'angular-mocks',
    'controllers',
    'services',
    'filters',
    'directives'
], function(angular) {
    angular.module('webApp', [
        'ngRoute',
        'ngResource',
        'webControllers',
        'webFilters',
        'webServices',
        'webDirectives'
    ]).config(['$interpolateProvider',
        function($interpolateProvider) {
            /* change configure to use [[ to be the interpolation */
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        }
    ]);
});
