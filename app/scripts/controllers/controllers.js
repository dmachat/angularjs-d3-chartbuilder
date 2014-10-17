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
      'chartbuilderError',
      function($scope, chartbuilderModuleRegistry, chartbuilderData, chartbuilderError) {
        $scope.modules = chartbuilderModuleRegistry;
        $scope.chartbuilderData = chartbuilderData;
        $scope.chartbuilderError = chartbuilderError;

        $scope.getAdvancedOptions = function() {
          if (!$scope.optionsLoaded) {
            $scope.nodeOptions.refresh();
            $scope.optionsLoaded = true;
          }
        };

      }]);
});
