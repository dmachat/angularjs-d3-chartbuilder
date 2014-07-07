/*
 Modular version of the bar chart nvd3-directive

 */
"use strict";

define(['angular'], function(angular) {
  angular.module('chartbuilder.barchart', ['chartbuilderServices'])
    .config(['$stateProvider', function($stateProvider) {
      $stateProvider.state('chartbuilder.barchart', {
        url: '/barchart',
        views: {
          'graph': {
            templateUrl: function(stateParams) {
              return 'scripts/angular_modules/nvd3-modules/barchart/template.html';
            },
            controller: 'graphController'
          }
        }
      });

      var module = {
        name: 'Bar Chart',
        slug: 'bar-chart'
      }
    }])
    .controller('graphController', ['$scope', '$location', 'getSampleData', function($scope, $location, getSampleData) {
      getSampleData().then(function(data) {
        $scope.exampleData = [data];
      });

      $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
      };
    }]);
});
