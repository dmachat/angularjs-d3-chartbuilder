define(['angular', 'services', 'angular-color-picker'], function(angular) {
  'use strict';

  /* Controllers */

  angular.module('chartbuilderControllers', ['chartbuilderServices', 'chartbuilderOptions', 'colorpicker.module'])
    .controller('Home', [
      '$scope',
      'chartbuilderModuleRegistry',
      'chartbuilderData',
      function($scope, chartbuilderModuleRegistry, chartbuilderData) {
        $scope.modules = chartbuilderModuleRegistry;
        $scope.chartbuilderData = chartbuilderData;
      }
    ])
    .controller('Chartbuilder', [
      '$scope',
      'chartbuilderModuleRegistry',
      'chartbuilderData',
      function($scope, chartbuilderModuleRegistry, chartbuilderData) {
        $scope.modules = chartbuilderModuleRegistry;
        $scope.chartbuilderData = chartbuilderData;

        $scope.showSampleData = function() {
          chartbuilderData.showSampleData();
        };

        $scope.resetData = function() {
          chartbuilderData.resetData();
        };

        $scope.getAdvancedOptions = function() {
          if (!$scope.optionsLoaded) {
            $scope.nodeOptions.refresh();
            $scope.optionsLoaded = true;
          }
        };

        $scope.addColor = function() {
          $scope.chartbuilderData.addNewColor();
        };

      }]);
});
