define(['angular', 'services'], function(angular) {
  'use strict';

  /* Controllers */

  angular.module('chartbuilderControllers', ['chartbuilderServices'])
    .value('chartbuilderModuleRegistry', {})
    .controller('headerCtrl', [
        '$scope',
        '$location',
        function($scope, $location) {
          $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
          };
        }
    ])
    .controller('Chartbuilder', ['$scope', '$location', '$state', '$http', '$filter', '$stateParams', 'chartbuilderModuleRegistry', 'chartbuilderDataStore', function($scope, $location, $state, $http, $filter, $stateParams, chartbuilderModuleRegistry, chartbuilderDataStore) {
      $scope.exampleData = [];
      $scope.chartHeight = 600;
      $scope.isDonut = false;

      $scope.modules = chartbuilderModuleRegistry;

      $scope.dataStore = chartbuilderDataStore;

      $scope.$watch('selectedChartType', function(newval) {
        if (angular.isUndefined(newval)) {
          return false;
        }
        $state.go('chartbuilder.' + newval);
      }, true);

      $scope.getSampleData = function() {
        $scope.$broadcast('getSampleData');
      };

      $scope.addGroup = function() {
        if (!$scope.newDataGroup) {
          return false;
        }
        $scope.exampleData.push({ key: $scope.newDataGroup, values: [] });
        $scope.newDataGroup = '';
      };

      // Functions for cumulative line graph
      $scope.xLineFunction = function(){
        return function(d) {
          return d[0];
        };
      };
      $scope.yLineFunction = function(){
        return function(d) {
          return d[1]/100;
        };
      };

      // Functions for pie chart rendering
      $scope.xPieFunction = function(){
        return function(d) {
          return d.key;
        };
      };
      $scope.yPieFunction = function(){
        return function(d) {
          return d.y;
        };
      };

    }]);
});
