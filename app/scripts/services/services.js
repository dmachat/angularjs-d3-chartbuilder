define(['angular'], function(angular) {
  'use strict';

  /* Services */
  angular.module('chartbuilderServices', [])
    .factory('getSampleData', ['$http', function($http) {
      return function() {
        return $http.get('/scripts/angular_modules/nvd3-modules/barchart/data.json').then(function(result) {
          return result.data;
        });
      };
    }]);
});
