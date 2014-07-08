/*
 Modular version of the line-chart nvd3-directive

 */
"use strict";

define(['angular'], function(angular) {
  angular.module('chartbuilder.linechart', ['chartbuilderServices'])
    .value('chartbuilderModuleRegistry', {})
    .value('chartbuilderDataStore', [])
    .config(['$stateProvider', function($stateProvider) {
      $stateProvider.state('chartbuilder.linechart', {
        url: '/linechart',
        views: {
          'graph': {
            templateUrl: function(stateParams) {
              return 'scripts/angular_modules/nvd3-modules/linechart/template.html';
            },
            controller: 'graphController'
          }
        }
      });
    }])
    .run(['chartbuilderModuleRegistry', function(chartbuilderModuleRegistry) {
      var module = {
        'Line Chart': {
          name: 'Line Chart',
          slug: 'line-chart'
        }
      }

      angular.extend(chartbuilderModuleRegistry, module);
    }])
    .controller('graphController', ['$scope', '$location', 'getSampleData', 'chartbuilderDataStore', function($scope, $location, getSampleData, chartbuilderDataStore) {
      $scope.$on('getSampleData', function() {
        getSampleData().then(function(data) {
          $scope.exampleData = chartbuilderDataStore = [data];
        });
      })
      $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
      };
    }]);
});
