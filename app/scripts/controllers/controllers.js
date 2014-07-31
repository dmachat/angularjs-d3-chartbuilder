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
        $scope.selectedChartType = chartbuilderSelectedModule;
        $scope.structureData = chartbuilderData;

        $scope.changeChartType = function(type) {
          if (angular.isUndefined(type) || type === '') {
            return false;
          }
          $state.go('chartbuilder.' + type);
        };

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
          chartbuilderData.addGroup($scope.newDataGroup);
          $scope.newDataGroup = '';
        };

        $scope.getAdvancedOptions = function() {
          if (!$scope.optionsLoaded) {
            $scope.nodeOptions.refresh();
            $scope.optionsLoaded = true;
          }
        };
      }]);
});
