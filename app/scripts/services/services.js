define(['angular'], function(angular) {
    'use strict';

    /* Services */
    angular.module('webServices', [])
			.factory('getSampleData', ['$http', function($http) {
				return function() {
					return $http.get('/data/sample-data.json').then(function(result) {
						return result.data;
					});
				}
			}]);
});
