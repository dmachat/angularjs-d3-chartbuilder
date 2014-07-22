define(['angular', 'services'], function(angular) {
  'use strict';

  /* Controllers */

  angular.module('chartbuilderControllers', ['chartbuilderServices'])
    .controller('headerCtrl', [
      '$scope',
      '$location',
      function($scope, $location) {
        $scope.isActive = function(viewLocation) {
          return viewLocation === $location.path();
        };
      }
    ])
    .controller('Chartbuilder', [
      '$scope',
      '$location',
      '$state',
      '$http',
      '$filter',
      '$stateParams',
      'chartbuilderModuleRegistry',
      'chartbuilderData',
      'chartbuilderSelectedModule',
      function($scope, $location, $state, $http, $filter, $stateParams, chartbuilderModuleRegistry, chartbuilderData, chartbuilderSelectedModule) {
        $scope.modules = chartbuilderModuleRegistry;
        $scope.selectedChartType = chartbuilderSelectedModule.selected;
        $scope.structureData = chartbuilderData;

        $scope.$watch('selectedChartType', function(newval) {
          if (angular.isUndefined(newval)) {
            return false;
          }
          $state.go('chartbuilder.' + newval);
        }, true);

        $scope.showSampleData = function() {
          chartbuilderData.showSampleData();
        };

        $scope.resetData = function() {
          chartbuilderData.resetData();
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
