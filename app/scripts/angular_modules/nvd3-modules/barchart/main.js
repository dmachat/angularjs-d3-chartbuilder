/*
 Modular version of the bar chart nvd3-directive

 */
"use strict";

define(['angular'], function(angular) {
  angular.module('chartbuilder.barchart', ['chartbuilderServices'])
    .value('chartbuilderModuleRegistry', {})
    .value('chartbuilderDataStore', [])
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
    }])
    .run(['chartbuilderModuleRegistry', function(chartbuilderModuleRegistry) {
      var module = {
        'Bar Chart': {
          name: 'Bar Chart',
          slug: 'barchart'
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
