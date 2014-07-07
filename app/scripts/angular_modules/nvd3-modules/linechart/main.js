/*
 Modular version of the line-chart nvd3-directive

 */
"use strict";

define(['angular'], function(angular) {
  angular.module('chartbuilder.linechart', [])
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

      var module = {
        name: 'Line Chart',
        slug: 'line-chart'
      }
    }])
    .controller('graphController', ['$scope', '$location', function($scope, $location) {
      $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
      };
    }]);
});
